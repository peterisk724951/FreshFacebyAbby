import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, phone: phone || null, message });

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
