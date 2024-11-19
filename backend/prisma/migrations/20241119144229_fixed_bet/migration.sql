/*
  Warnings:

  - You are about to drop the column `workoutGoalId` on the `Bet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Bet_workoutGoalId_key";

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "workoutGoalId";
