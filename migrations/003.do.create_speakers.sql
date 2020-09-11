CREATE TABLE "speakers" (
  "id" SERIAL PRIMARY KEY,
  "emotion" INTEGER NOT NULL,
  "topic" INTEGER NOT NULL,
  "spe_gender" TEXT NOT NULL,
  "spe_age" INTEGER NOT NULL,
  "user_id" INTEGER REFERENCES "mpath_users"(id)
    ON DELETE CASCADE NOT NULL
);