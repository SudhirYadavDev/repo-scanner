"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getCachedGithubStats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      totalRepositories: true,
      totalStars: true,
      publicRepositories: true,
      privateRepositories: true,
      totalContributions: true,
      currentYearContributions: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}
