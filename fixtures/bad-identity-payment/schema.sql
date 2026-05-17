CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  payment_owner_email TEXT NOT NULL,
  amount_cents INTEGER NOT NULL
);
