-- CreateEnum
CREATE TYPE "videoStatus" AS ENUM ('UPLOADING', 'PROCESSING', 'UPLOADED');

-- CreateEnum
CREATE TYPE "videoFormat" AS ENUM ('FORMAT_460P', 'FORMAT_720P', 'FORMAT_1080P');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "status" "videoStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoFormat" (
    "id" TEXT NOT NULL,
    "format" "videoFormat" NOT NULL,
    "url" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoFormat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_key" ON "Channel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_slug_key" ON "Channel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_userId_key" ON "Channel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VideoFormat_id_key" ON "VideoFormat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VideoFormat_url_key" ON "VideoFormat"("url");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoFormat" ADD CONSTRAINT "VideoFormat_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
