"use server";

import { db } from "@/lib/db";

export async function verifyOwnerPassword(password: string) {
  if (password !== process.env.OWNER_PASSWORD) {
    return {
      success: false,
      visits: 0,
    };
  }

  const stats = await db.websiteStats.findUnique({
    where: {
      id: 1,
    },
  });

  return {
    success: true,
    visits: stats?.totalVisits ?? 0,
  };
}