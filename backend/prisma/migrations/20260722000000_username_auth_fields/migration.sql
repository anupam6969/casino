-- AlterTable
ALTER TABLE "User" ADD COLUMN "username" TEXT;

-- BackfillUsername
UPDATE "User"
SET "username" = concat('player_', substring("id" from 1 for 13))
WHERE "username" IS NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
