import { Repository } from "@prisma/client";

import { ImportedRepository } from "../types/importedRepository";

export function mapImportedRepository(
  repository: Repository
): ImportedRepository {
  return {
    id: repository.id,
    githubId: repository.githubId,
    name: repository.name,
    fullName: repository.fullName,
    owner: repository.owner,
    language: repository.language,
    isPrivate: repository.isPrivate,
    visibility: repository.visibility,
    stars: repository.stars,
    forks: repository.forks,
    lastSyncedAt: repository.lastSyncedAt,
  };
}