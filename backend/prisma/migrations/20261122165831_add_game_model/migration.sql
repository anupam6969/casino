-- DropIndex
DROP INDEX "WalletCall_playerRef_idx";

-- DropIndex
DROP INDEX "WalletCall_reversesTxRef_idx";

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studioSlug" TEXT NOT NULL,
    "studioName" TEXT NOT NULL,
    "categories" TEXT[],
    "icon" TEXT,
    "thumbnails" JSONB,
    "rtp" TEXT,
    "volatility" INTEGER,
    "tags" TEXT[],
    "maintenance" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "Game_slug_idx" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "Game_studioSlug_idx" ON "Game"("studioSlug");
