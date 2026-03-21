-- Photos for SOAP notes (before/after)
create table soap_note_photos (
  id uuid primary key default gen_random_uuid(),
  soap_note_id uuid not null references soap_notes(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  label text not null default 'before' check (label in ('before', 'after', 'other')),
  storage_path text not null,
  created_at timestamptz default now()
);

create index idx_soap_note_photos_note on soap_note_photos(soap_note_id);
alter table soap_note_photos enable row level security;

-- Track last booking date on customers for retention queries
-- (We'll compute this from bookings, no schema change needed)

-- Add price tracking to bookings for revenue
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS price_cents integer;
