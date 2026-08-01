"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import { getUserRepositories } from "../services/github";
import { mapGitHubRepository } from "../mappers/mapper";

export async function syncRepositories() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const account = await db.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  if (!account?.accessToken) {
    throw new Error("GitHub access token not found.");
  }

  const repositories = await getUserRepositories(account.accessToken);

  console.log(repositories);

  return repositories.map(mapGitHubRepository);
}