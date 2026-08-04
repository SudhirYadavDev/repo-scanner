"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getVisitCount() {
  await db.websiteStats.upsert({
    where: {
      id: 1,
    },
    update: {
      totalVisits: {
        increment: 1,
      },
    },
    create: {
      id: 1,
      totalVisits: 1,
    },
  });

  const stats = await db.websiteStats.findUnique({
    where: {
      id: 1,
    },
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const showCounter =
    session?.user.name === "SudhirYadavDev";

  return {
    visits: stats?.totalVisits ?? 1,
    showCounter,
  };
}