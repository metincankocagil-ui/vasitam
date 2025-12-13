-- Add code column allowing nulls initially
ALTER TABLE "Listing" ADD COLUMN "code" TEXT;

-- Backfill existing rows with deterministic unique codes
WITH ordered AS (
  SELECT id, row_number() OVER (ORDER BY id) AS rn
  FROM "Listing"
)
UPDATE "Listing"
SET code = lpad(CAST(2586351000 + ordered.rn AS TEXT), 10, '0')
FROM ordered
WHERE "Listing".id = ordered.id AND "Listing".code IS NULL;

-- Enforce constraints
ALTER TABLE "Listing"
  ALTER COLUMN "code" SET NOT NULL;

CREATE UNIQUE INDEX "Listing_code_key" ON "Listing"("code");
