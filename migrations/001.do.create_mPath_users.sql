CREATE TABLE mPath_users(
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    user_age INTEGER NOT NULL,
    user_gender INTEGER NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);