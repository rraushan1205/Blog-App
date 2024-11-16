/*
  Warnings:

  - Made the column `likecount` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "likecount" SET NOT NULL,
ALTER COLUMN "likecount" SET DEFAULT 0;
