CREATE TABLE "listeners" (
  "id" SERIAL PRIMARY KEY,
  "emotion" INTEGER NOT NULL,
  "topic" INTEGER NOT NULL,
  "spe_gender" INTEGER NOT NULL,
  "spe_age" INTEGER NOT NULL,
  "data_created" TIMESTAMPTZ DEFAULT now() NOT NULL,
  "user_id" INTEGER REFERENCES "mpath_users"(id)
    ON DELETE CASCADE NOT NULL
);