import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const { id } = await params;
  const body = await req.json();

  const { error, data } = await supabaseAdmin
    .from("soap_notes")
    .insert({
      customer_id: id,
      booking_id: body.booking_id || null,
      subjective: body.subjective || null,
      objective: body.objective || null,
      assessment: body.assessment || null,
      plan: body.plan || null,
      products_used: body.products_used || null,
      contraindications: body.contraindications || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
