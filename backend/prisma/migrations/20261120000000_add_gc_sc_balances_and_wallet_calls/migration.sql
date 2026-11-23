-- Add gcBalance and scBalance columns to User
ALTER TABLE "User" ADD COLUMN "gcBalance" TEXT NOT NULL DEFAULT '0.00000000';
ALTER TABLE "User" ADD COLUMN "scBalance" TEXT NOT NULL DEFAULT '0.00000000';

-- Migrate coinBalance (cents) to gcBalance (decimal string scale 8)
UPDATE "User" SET "gcBalance" = to_char("coinBalance" / 100.0, 'FM999999990.00000000');

-- Create WalletCall table for SweepPark wallet idempotency and reversal tracking
CREATE TABLE "WalletCall" (
    "txRef" TEXT NOT NULL,
    "playerRef" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "amount" TEXT,
    "reversesTxRef" TEXT,
    "status" TEXT NOT NULL,
    "resultCode" TEXT NOT NULL,
    "balanceAfter" TEXT NOT NULL,
    "operatorTxRef" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WalletCall_pkey" PRIMARY KEY ("txRef")
);

-- Foreign key to User
ALTER TABLE "WalletCall" ADD CONSTRAINT "WalletCall_playerRef_fkey" FOREIGN KEY ("playerRef") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Index for faster lookups
CREATE INDEX "WalletCall_playerRef_idx" ON "WalletCall"("playerRef");
CREATE INDEX "WalletCall_reversesTxRef_idx" ON "WalletCall"("reversesTxRef");