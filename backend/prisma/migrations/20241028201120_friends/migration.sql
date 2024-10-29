-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "password_hash" TEXT,
ADD COLUMN     "refreshTokenVersion" INTEGER;

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "user_id1" TEXT NOT NULL,
    "user_id2" TEXT NOT NULL,
    "status" "FriendStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Friend_user_id1_idx" ON "Friend"("user_id1");

-- CreateIndex
CREATE INDEX "Friend_user_id2_idx" ON "Friend"("user_id2");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_user_id1_user_id2_key" ON "Friend"("user_id1", "user_id2");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user_id1_fkey" FOREIGN KEY ("user_id1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user_id2_fkey" FOREIGN KEY ("user_id2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
