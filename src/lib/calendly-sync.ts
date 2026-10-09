import type { SupabaseClient } from "@supabase/supabase-js";

const CALENDLY_API = "https://api.calendly.com";

interface CalendlyEvent {
  uri: string;
  name: string;
  status: "active" | "canceled";
  start_time: string;
  end_time: string;
}

interface CalendlyInvitee {
  email: string;
  name: string;
  timezone: string | null;
}

export interface SyncResult {
  calendlyEvents: number;
  added: number;
  addedCancelled: number;
  markedCancelled: number;
  alreadyInSync: number;
  skipped: number;
  failed: number;
}

async function calendlyGet<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Calendly API ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

async function listAllEvents(token: string): Promise<CalendlyEvent[]> {
  const me = await calendlyGet<{ resource: { uri: string } }>(
    `${CALENDLY_API}/users/me`,
    token
  );

  const events: CalendlyEvent[] = [];
  for (const status of ["active", "canceled"]) {
    let url: string | null =
      `${CALENDLY_API}/scheduled_events?` +
      new URLSearchParams({ user: me.resource.uri, status, count: "100" });
    while (url) {
      const page: {
        collection: CalendlyEvent[];
        pagination: { next_page: string | null };
      } = await calendlyGet(url, token);
      events.push(...page.collection);
      url = page.pagination.next_page;
    }
  }
  return events;
}

// Match a Calendly event name to one of our services
export async function matchServiceId(
  db: SupabaseClient,
  eventTypeName: string | undefined
): Promise<string | null> {
  if (!eventTypeName) return null;

  // Try exact-ish match first, then fuzzy
  const { data: service } = await db
    .from("services")
    .select("id")
    .ilike("name", `%${eventTypeName.split("-")[0].trim()}%`)
    .limit(1)
    .single();
  if (service) return service.id;

  // Fallback: check if it contains "customized" or "custom"
  const nameLower = eventTypeName.toLowerCase();
  let slug = "customized-facial";
  if (nameLower.includes("signature") || nameLower.includes("glow")) slug = "signature-glow-facial";
  else if (nameLower.includes("ultimate") || nameLower.includes("renewal")) slug = "ultimate-renewal-facial";
  else if (nameLower.includes("acne") || nameLower.includes("clarifying")) slug = "clarifying-acne-facial";

  const { data: fallback } = await db
    .from("services")
    .select("id")
    .eq("slug", slug)
    .single();
  return fallback?.id ?? null;
}

async function addMissingBooking(
  db: SupabaseClient,
  token: string,
  event: CalendlyEvent
): Promise<boolean> {
  const { collection } = await calendlyGet<{ collection: CalendlyInvitee[] }>(
    `${event.uri}/invitees?count=1`,
    token
  );
  const invitee = collection[0];
  if (!invitee?.email) return false;

  const email = invitee.email.toLowerCase();
  const nameParts = (invitee.name ?? "").trim().split(/\s+/);

  // Reuse the customer if we already have them; never overwrite their details
  let { data: customer } = await db
    .from("customers")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (!customer) {
    const { data: created, error } = await db
      .from("customers")
      .insert({
        email,
        first_name: nameParts[0] ?? "",
        last_name: nameParts.slice(1).join(" ") || null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    customer = created;
  }

  const { error } = await db.from("bookings").insert({
    customer_id: customer.id,
    service_id: await matchServiceId(db, event.name),
    starts_at: event.start_time,
    ends_at: event.end_time,
    status: event.status === "canceled" ? "cancelled" : "confirmed",
    calendly_event_id: event.uri,
    notes: [
      `Service: ${event.name}`,
      invitee.timezone ? `Timezone: ${invitee.timezone}` : null,
      "Synced from Calendly",
    ]
      .filter(Boolean)
      .join(" | "),
  });
  if (error) throw new Error(error.message);
  return true;
}

/**
 * Bring bookings in line with Calendly. Only adds bookings that are missing
 * and cancels confirmed bookings that were cancelled in Calendly — statuses
 * set in the admin (completed, no-show) are never overwritten.
 */
export async function syncFromCalendly(
  db: SupabaseClient,
  token: string,
  dryRun: boolean
): Promise<SyncResult> {
  const events = await listAllEvents(token);

  const existing = new Map<string, { id: string; status: string }>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("bookings")
      .select("id, status, calendly_event_id")
      .not("calendly_event_id", "is", null)
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const row of data) existing.set(row.calendly_event_id, row);
    if (data.length < 1000) break;
  }

  const result: SyncResult = {
    calendlyEvents: events.length,
    added: 0,
    addedCancelled: 0,
    markedCancelled: 0,
    alreadyInSync: 0,
    skipped: 0,
    failed: 0,
  };

  async function syncEvent(event: CalendlyEvent) {
    const booking = existing.get(event.uri);
    const cancelled = event.status === "canceled";

    // Personal time blocks on the calendar aren't client appointments
    if (/\bbreak\b/i.test(event.name)) {
      result.skipped++;
    } else if (!booking) {
      if (!dryRun && !(await addMissingBooking(db, token, event))) {
        result.skipped++;
      } else if (cancelled) {
        result.addedCancelled++;
      } else {
        result.added++;
      }
    } else if (cancelled && booking.status === "confirmed") {
      if (!dryRun) {
        const { error } = await db
          .from("bookings")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("id", booking.id);
        if (error) throw new Error(error.message);
      }
      result.markedCancelled++;
    } else {
      result.alreadyInSync++;
    }
  }

  // Small batches keep us under Calendly's rate limit
  for (let i = 0; i < events.length; i += 5) {
    const batch = await Promise.allSettled(events.slice(i, i + 5).map(syncEvent));
    for (const outcome of batch) {
      if (outcome.status === "rejected") {
        console.error("Calendly sync error:", outcome.reason);
        result.failed++;
      }
    }
  }

  return result;
}
