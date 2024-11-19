-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_betId_fkey";

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "betId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
