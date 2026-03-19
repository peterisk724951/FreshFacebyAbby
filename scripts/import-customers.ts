import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface ShopifyCustomer {
  "Customer ID": string;
  "First Name": string;
  "Last Name": string;
  Email: string;
  Phone: string;
  "Accepts Email Marketing": string;
  Tags: string;
  Note: string;
}

async function importCustomers() {
  const csv = readFileSync("customers_export.csv", "utf-8");
  const records: ShopifyCustomer[] = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const customers: { email: string; first_name: string | null; last_name: string | null; phone: string | null; notes: string | null }[] = [];
  const newsletterEmails: string[] = [];

  for (const row of records) {
    const email = row.Email?.trim();
    const phone = row.Phone?.replace(/'/g, "").trim() || null;
    const firstName = row["First Name"]?.trim() || null;
    const lastName = row["Last Name"]?.trim() || null;
    const tags = row.Tags?.toLowerCase() || "";
    const note = row.Note?.trim() || null;

    // Skip rows with no email and no phone
    if (!email && !phone) continue;

    // Skip obvious spam/test entries
    if (email && email.includes("inscrlab.com")) continue;

    // Skip Abby's own business email
    if (email === "freshfacebyabby@gmail.com") continue;

    if (email) {
      customers.push({
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        notes: note || null,
      });

      // Track newsletter subscribers
      if (tags.includes("newsletter")) {
        newsletterEmails.push(email);
      }
    }
  }

  // Import customers
  console.log(`Importing ${customers.length} customers...`);
  const { error: custError, data: custData } = await supabase
    .from("customers")
    .upsert(customers, { onConflict: "email" })
    .select();

  if (custError) {
    console.error("Customer import error:", custError.message);
  } else {
    console.log(`Imported ${custData?.length ?? 0} customers.`);
  }

  // Import newsletter subscribers
  if (newsletterEmails.length > 0) {
    console.log(`Importing ${newsletterEmails.length} newsletter subscribers...`);
    const subs = newsletterEmails.map((email) => ({ email }));
    const { error: subError, data: subData } = await supabase
      .from("newsletter_subscribers")
      .upsert(subs, { onConflict: "email" })
      .select();

    if (subError) {
      console.error("Newsletter import error:", subError.message);
    } else {
      console.log(`Imported ${subData?.length ?? 0} newsletter subscribers.`);
    }
  }

  console.log("Done.");
}

importCustomers();
