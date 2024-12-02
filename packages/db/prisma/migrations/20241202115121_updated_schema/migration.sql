/*
  Warnings:

  - The values [UPLOADING,UPLOADED] on the enum `videoStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Video` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "videoStatus_new" AS ENUM ('PROCESSING', 'TRANSCODING', 'PROCESSED');
ALTER TABLE "Video" ALTER COLUMN "status" TYPE "videoStatus_new" USING ("status"::text::"videoStatus_new");
ALTER TYPE "videoStatus" RENAME TO "videoStatus_old";
ALTER TYPE "videoStatus_new" RENAME TO "videoStatus";
DROP TYPE "videoStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_userId_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "userId",
ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_channelId_key" ON "Subscription"("userId", "channelId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
