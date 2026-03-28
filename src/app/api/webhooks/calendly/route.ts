import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const event = body.event as string;
  const payload = body.payload;

  try {
    if (event === "invitee.created") {
      await handleBookingCreated(payload);
    } else if (event === "invitee.canceled") {
      await handleBookingCanceled(payload);
    }
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function handleBookingCreated(payload: Record<string, unknown>) {
  if (!supabaseAdmin) return;

  const email = payload.email as string;
  const name = payload.name as string;
  const timezone = payload.timezone as string;
  const calendlyEventUri = payload.event as string;

  // Event type info
  const eventType = payload.event_type as Record<string, unknown> | undefined;
  const eventTypeName = eventType?.name as string | undefined;

  // Scheduled event times
  const scheduledEvent = payload.scheduled_event as
    | Record<string, unknown>
    | undefined;
  const startTime = scheduledEvent?.start_time as string | undefined;
  const endTime = scheduledEvent?.end_time as string | undefined;

  // Parse name
  const nameParts = (name ?? "").trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") || null;

  // Upsert customer
  const { data: customer } = await supabaseAdmin
    .from("customers")
    .upsert(
      {
        email: email.toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (!customer) return;

  // Match service by event type name
  let serviceId: string | null = null;
  if (eventTypeName) {
    // Try exact-ish match first, then fuzzy
    const { data: service } = await supabaseAdmin
      .from("services")
      .select("id")
      .ilike("name", `%${eventTypeName.split("-")[0].trim()}%`)
      .limit(1)
      .single();
    if (service) {
      serviceId = service.id;
    } else {
      // Fallback: check if it contains "customized" or "custom"
      const nameLower = eventTypeName.toLowerCase();
      let slug = "customized-facial";
      if (nameLower.includes("signature") || nameLower.includes("glow")) slug = "signature-glow-facial";
      else if (nameLower.includes("ultimate") || nameLower.includes("renewal")) slug = "ultimate-renewal-facial";
      else if (nameLower.includes("acne") || nameLower.includes("clarifying")) slug = "clarifying-acne-facial";

      const { data: fallback } = await supabaseAdmin
        .from("services")
        .select("id")
        .eq("slug", slug)
        .single();
      serviceId = fallback?.id ?? null;
    }
  }

  // Create booking
  await supabaseAdmin.from("bookings").upsert(
    {
      customer_id: customer.id,
      service_id: serviceId,
      starts_at: startTime ?? null,
      ends_at: endTime ?? null,
      status: "confirmed",
      calendly_event_id: calendlyEventUri,
      notes: [
        eventTypeName ? `Service: ${eventTypeName}` : null,
        timezone ? `Timezone: ${timezone}` : null,
      ]
        .filter(Boolean)
        .join(" | "),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "calendly_event_id" }
  );
}

async function handleBookingCanceled(payload: Record<string, unknown>) {
  if (!supabaseAdmin) return;

  const calendlyEventUri = payload.event as string;
  const cancellation = payload.cancellation as
    | Record<string, unknown>
    | undefined;
  const canceledBy = cancellation?.canceled_by as string | undefined;
  const reason = cancellation?.reason as string | undefined;

  if (!calendlyEventUri) return;

  const notes = [
    canceledBy ? `Canceled by: ${canceledBy}` : null,
    reason ? `Reason: ${reason}` : null,
  ]
    .filter(Boolean)
    .join(". ");

  await supabaseAdmin
    .from("bookings")
    .update({
      status: "cancelled",
      notes: notes || "Cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("calendly_event_id", calendlyEventUri);
}
