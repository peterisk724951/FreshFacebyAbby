-- SOAP Notes for client records
create table soap_notes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  subjective text,
  objective text,
  assessment text,
  plan text,
  products_used text,
  contraindications text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_soap_notes_customer_id on soap_notes(customer_id);
create index idx_soap_notes_booking_id on soap_notes(booking_id);
alter table soap_notes enable row level security;

-- Add Calendly event tracking to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS calendly_event_id text UNIQUE;
ALTER TABLE bookings ALTER COLUMN starts_at DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN ends_at DROP NOT NULL;
