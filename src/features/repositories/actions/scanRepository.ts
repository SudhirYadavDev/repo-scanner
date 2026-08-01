"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import { runRepositoryScan } from "../scanner/scanner";
import { RepositoryScanResult } from "../scanner/scanResult";

export async function scanRepository(
  repositoryId: string,
): Promise<RepositoryScanResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const repository = await db.repository.findFirst({
    where: {
      id: repositoryId,
      userId: session.user.id,
    },
  });

  if (!repository) {
    throw new Error("Repository not found.");
  }

  return await runRepositoryScan(repository);
}
