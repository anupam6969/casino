-- Create Nonce table for SweepPark nonce dedupe
CREATE TABLE "Nonce" (
    "nonce" TEXT NOT NULL,
    "bodyHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Nonce_pkey" PRIMARY KEY ("nonce")
);