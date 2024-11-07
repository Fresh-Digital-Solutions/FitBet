-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutGoal" ALTER COLUMN "time_gone" SET DEFAULT 0,
ALTER COLUMN "time_missed" SET DEFAULT 0;
