"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import { RepositoryListItem } from "../types/repository";

export async function importRepositories(repositories: RepositoryListItem[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const selectedRepositories = repositories.filter(
    (repository) => repository.selected,
  );

  const syncedAt = new Date();

  for (const repository of selectedRepositories) {
    await db.repository.upsert({
      where: {
        githubId: repository.githubId,
      },
      update: {
        name: repository.name,
        fullName: repository.fullName,
        owner: repository.owner,
        language: repository.language,
        isPrivate: repository.isPrivate,
        stars: repository.stars,
        forks: repository.forks,
        lastSyncedAt: syncedAt,
      },
      create: {
        githubId: repository.githubId,
        name: repository.name,
        fullName: repository.fullName,
        owner: repository.owner,
        language: repository.language,
        isPrivate: repository.isPrivate,
        stars: repository.stars,
        forks: repository.forks,

        description: null,
        htmlUrl: "",
        defaultBranch: "main",
        openIssues: 0,
        size: 0,
        visibility: repository.isPrivate ? "private" : "public",
        pushedAt: null,

        lastSyncedAt: syncedAt,

        userId: session.user.id,
      },
    });
  }

  return {
    imported: selectedRepositories.length,
  };
}
