CREATE TABLE "listeners" (
  "id" SERIAL PRIMARY KEY,
  "emotion" INTEGER NOT NULL,
  "topic" INTEGER NOT NULL,
  "lis_gender" TEXT NOT NULL,
  "lis_age" INTEGER NOT NULL,
  "user_id" INTEGER REFERENCES "mpath_users"(id)
    ON DELETE CASCADE NOT NULL
);