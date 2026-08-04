import { Repository } from "@prisma/client";

import { downloadRepository } from "./downloadRepository";

export async function cloneRepository(
  repository: Repository,
  accessToken: string,
) {
  console.log("Scanning:");
  console.log(repository.fullName);

  const repositoryDirectory = await downloadRepository(
    repository.fullName,
    accessToken,
  );

  console.log("Repository downloaded successfully.");

  return repositoryDirectory;
}