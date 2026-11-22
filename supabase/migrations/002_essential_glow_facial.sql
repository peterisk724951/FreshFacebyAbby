-- Replace "Customized Facial" with "The Essential Glow Facial" (60 min, flat $100)
-- and put the menu in the approved order:
--   1. The Essential Glow Facial      60 min  $100
--   2. Abby's Signature Glow Facial   75 min  $125
--   3. Ultimate Renewal Facial        90 min  $150
--   4. Clarifying Acne Facial         60 min  From $110
-- Existing bookings keep pointing at the same row (same id), so history is preserved.

update services
set
  name = 'The Essential Glow Facial',
  slug = 'the-essential-glow-facial',
  description = 'Deep double cleanse, exfoliation suited to your skin, steam and extractions where needed, a customized mask, and a finish of serum, moisturizer and SPF. The right first facial, and the one to keep coming back to.',
  duration_minutes = 60,
  price_cents = 10000,
  price_label = '$100',
  sort_order = 1
where slug = 'customized-facial';

update services set sort_order = 2 where slug = 'signature-glow-facial';
update services set sort_order = 3 where slug = 'ultimate-renewal-facial';
update services set sort_order = 4 where slug = 'clarifying-acne-facial';
