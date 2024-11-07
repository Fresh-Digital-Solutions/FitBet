/*
  Warnings:

  - You are about to drop the column `money_received` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `money_sent` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `time_received` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `time_sent` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `user1_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `user2_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `betId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_transactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user1_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user2_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "money_received",
DROP COLUMN "money_sent",
DROP COLUMN "time_received",
DROP COLUMN "time_sent",
DROP COLUMN "user1_id",
DROP COLUMN "user2_id",
ADD COLUMN     "betId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "stripe_transactionId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
