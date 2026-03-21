import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const { id } = await params;

  const [customerRes, bookingsRes, notesRes, photosRes] = await Promise.all([
    supabaseAdmin.from("customers").select("*").eq("id", id).single(),
    supabaseAdmin
      .from("bookings")
      .select("*, services(name)")
      .eq("customer_id", id)
      .order("starts_at", { ascending: false }),
    supabaseAdmin
      .from("soap_notes")
      .select("*")
      .eq("customer_id", id)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("soap_note_photos")
      .select("*")
      .eq("customer_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (customerRes.error) {
    return NextResponse.json(
      { error: customerRes.error.message },
      { status: 404 }
    );
  }

  // Attach photos to their SOAP notes and generate public URLs
  const photos = photosRes.data ?? [];
  const notesWithPhotos = (notesRes.data ?? []).map((note: { id: string }) => ({
    ...note,
    photos: photos
      .filter((p: { soap_note_id: string }) => p.soap_note_id === note.id)
      .map((p: { storage_path: string }) => ({
        ...p,
        url: supabaseAdmin!.storage.from("soap-photos").getPublicUrl(p.storage_path).data.publicUrl,
      })),
  }));

  return NextResponse.json({
    customer: customerRes.data,
    bookings: bookingsRes.data ?? [],
    soapNotes: notesWithPhotos,
  });
}
