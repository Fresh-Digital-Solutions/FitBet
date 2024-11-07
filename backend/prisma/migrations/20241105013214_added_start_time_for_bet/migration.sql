/*
  Warnings:

  - Added the required column `start_at` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL;
