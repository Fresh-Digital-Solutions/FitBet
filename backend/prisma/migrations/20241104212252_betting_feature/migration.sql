-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "user_id1" TEXT NOT NULL,
    "user_id2" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "BetStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "workoutGoalId" TEXT,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutGoal" (
    "id" TEXT NOT NULL,
    "amount_time" INTEGER NOT NULL,
    "time_gone" INTEGER NOT NULL,
    "time_missed" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL,
    "user_id1" TEXT NOT NULL,
    "betId" TEXT,

    CONSTRAINT "WorkoutGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "goal_id" TEXT NOT NULL,
    "image" TEXT,
    "image_time" TIMESTAMP(3),
    "at_gym" BOOLEAN NOT NULL,
    "geolocation_start_time" TIMESTAMP(3) NOT NULL,
    "geolocation_end_time" TIMESTAMP(3) NOT NULL,
    "watch_data" JSONB,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "user1_id" TEXT NOT NULL,
    "user2_id" TEXT NOT NULL,
    "money_sent" DOUBLE PRECISION NOT NULL,
    "money_received" DOUBLE PRECISION NOT NULL,
    "time_sent" TIMESTAMP(3) NOT NULL,
    "time_received" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bet_workoutGoalId_key" ON "Bet"("workoutGoalId");

-- CreateIndex
CREATE UNIQUE INDEX "Bet_user_id1_user_id2_key" ON "Bet"("user_id1", "user_id2");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutGoal_betId_key" ON "WorkoutGoal"("betId");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_user_id1_fkey" FOREIGN KEY ("user_id1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_user_id2_fkey" FOREIGN KEY ("user_id2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutGoal" ADD CONSTRAINT "WorkoutGoal_user_id1_fkey" FOREIGN KEY ("user_id1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutGoal" ADD CONSTRAINT "WorkoutGoal_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "WorkoutGoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
