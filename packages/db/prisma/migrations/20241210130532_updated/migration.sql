/*
  Warnings:

  - Added the required column `headerUrl` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatarUrl` on table `Channel` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `category` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "videoCategory" AS ENUM ('ENTERTAINMENT', 'EDUCATION', 'SPORTS', 'NEWS', 'TECHNOLOGY', 'FASHON');

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "headerUrl" TEXT NOT NULL,
ALTER COLUMN "avatarUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "status" SET DEFAULT 'PROCESSING',
DROP COLUMN "category",
ADD COLUMN     "category" "videoCategory" NOT NULL;
