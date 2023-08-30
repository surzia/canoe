CREATE TABLE "story" (
  "id" integer PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "title" varchar,
  "description" varchar
);

CREATE TABLE "paragraph" (
  "id" integer PRIMARY KEY,
  "story_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "sequence" integer,
  "content" varchar
);

ALTER TABLE "paragraph" ADD FOREIGN KEY ("story_id") REFERENCES "story" ("id");
