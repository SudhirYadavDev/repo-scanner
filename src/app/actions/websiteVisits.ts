"use server";

import { db } from "@/lib/db";

export async function incrementWebsiteVisits() {
  const existing = await db.websiteStats.findUnique({
    where: {
      id: 1,
    },
  });

  if (!existing) {
    const created = await db.websiteStats.create({
      data: {
        id: 1,
        totalVisits: 1,
      },
    });

    return created.totalVisits;
  }

  const updated = await db.websiteStats.update({
    where: {
      id: 1,
    },
    data: {
      totalVisits: {
        increment: 1,
      },
    },
  });

  return updated.totalVisits;
}

export async function getWebsiteVisits() {
  const stats = await db.websiteStats.findUnique({
    where: {
      id: 1,
    },
  });

  return stats?.totalVisits ?? 0;
}