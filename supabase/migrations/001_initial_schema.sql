-- Fresh Face by Abby — Initial Schema

-- Services offered
create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  duration_minutes integer not null,
  price_cents integer not null,
  price_label text, -- e.g. "From $110" for variable pricing
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Customers
create table customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text,
  last_name text,
  phone text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  service_id uuid references services(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed', 'no_show')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact form submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

-- Seed services
insert into services (name, slug, description, duration_minutes, price_cents, price_label, is_featured, sort_order) values
  ('Ultimate Renewal Facial', 'ultimate-renewal-facial', 'Intensive treatment with double cleanse, microdermabrasion, facial massage, LED therapy, and chemical peel. Targets hyperpigmentation and aging signs.', 90, 15000, '$150', true, 1),
  ('Abby''s Signature Glow Facial', 'signature-glow-facial', 'Customized treatment including cleanse, exfoliation, massage, mask, extractions, and LED therapy. Your go-to luxury facial.', 75, 12500, '$125', true, 2),
  ('Clarifying Acne Facial', 'clarifying-acne-facial', 'Targets breakout-prone skin with pore-purifying cleanse, enzyme exfoliation, extractions, soothing mask, and high frequency treatment.', 60, 11000, 'From $110', true, 3),
  ('Customized Facial', 'customized-facial', 'Fully personalized treatment tailored to your individual skin goals and concerns.', 60, 10000, 'From $100', true, 4);

-- Row-level security
alter table services enable row level security;
alter table customers enable row level security;
alter table bookings enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public read access for services
create policy "Services are publicly readable"
  on services for select
  using (true);

-- Allow anonymous inserts for contact form and newsletter
create policy "Anyone can submit contact form"
  on contact_submissions for insert
  with check (true);

create policy "Anyone can subscribe to newsletter"
  on newsletter_subscribers for insert
  with check (true);
