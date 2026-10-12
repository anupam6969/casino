-- AlterTable
ALTER TABLE "User" ADD COLUMN "soapCustomerId" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "amountCents" INTEGER,
    "processedWebhookEventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_soapCustomerId_key" ON "User"("soapCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_checkoutId_key" ON "Transaction"("checkoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_processedWebhookEventId_key" ON "Transaction"("processedWebhookEventId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
