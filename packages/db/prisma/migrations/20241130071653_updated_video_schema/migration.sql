/*
  Warnings:

  - Added the required column `category` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "timestamp" INTEGER NOT NULL;
