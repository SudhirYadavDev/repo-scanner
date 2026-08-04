-- CreateTable
CREATE TABLE "website_stats" (
    "id" INTEGER NOT NULL,
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_stats_pkey" PRIMARY KEY ("id")
);
