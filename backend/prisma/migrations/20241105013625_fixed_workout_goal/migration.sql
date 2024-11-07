/*
  Warnings:

  - Added the required column `start_at` to the `WorkoutGoal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutGoal" ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL;
