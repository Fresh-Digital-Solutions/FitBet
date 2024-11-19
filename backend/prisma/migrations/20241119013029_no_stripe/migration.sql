/*
  Warnings:

  - You are about to drop the column `stripeId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeId",
ALTER COLUMN "balance" SET DEFAULT 500.0;
