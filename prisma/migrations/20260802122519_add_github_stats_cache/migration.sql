-- AlterTable
ALTER TABLE "user" ADD COLUMN     "currentYearContributions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "privateRepositories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "publicRepositories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "statsUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "totalContributions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRepositories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalStars" INTEGER NOT NULL DEFAULT 0;
