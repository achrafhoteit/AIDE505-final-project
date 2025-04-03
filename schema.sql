CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE summaries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  original_text TEXT,
  summary_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
