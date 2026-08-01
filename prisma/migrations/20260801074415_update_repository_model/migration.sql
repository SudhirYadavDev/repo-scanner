/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `repository` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visibility` to the `repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repository" ADD COLUMN     "forks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastSyncedAt" TIMESTAMP(3),
ADD COLUMN     "openIssues" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pushedAt" TIMESTAMP(3),
ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stars" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visibility" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "repository_fullName_key" ON "repository"("fullName");

-- CreateIndex
CREATE INDEX "repository_userId_idx" ON "repository"("userId");
