CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size INTEGER NOT NULL CHECK (size >= 1 AND size <= 10),
    status TEXT NOT NULL CHECK (status IN ('waiting', 'seated', 'finished')),
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
    check_in_at TIMESTAMP
);