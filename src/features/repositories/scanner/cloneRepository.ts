import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { promisify } from "node:util";

import { Repository } from "@prisma/client";

const execFileAsync = promisify(execFile);

export async function cloneRepository(
  repository: Repository,
  accessToken: string
) {
  const scanDirectory = join(
    tmpdir(),
    `repo-scanner-${crypto.randomUUID()}`
  );

  await mkdir(scanDirectory, {
    recursive: true,
  });

  console.log("Scanning:");
  console.log(repository.fullName);

  console.log("Temporary scan directory:");
  console.log(scanDirectory);

  const cloneUrl = `https://${accessToken}@github.com/${repository.fullName}.git`;

  try {
  await execFileAsync("git", [
    "clone",
    "--depth",
    "1",
    cloneUrl,
    scanDirectory,
  ]);
} catch (error) {
  console.error("Git failed:");
  console.error(error);
  throw error;
}

  console.log("Repository cloned successfully.");

  return scanDirectory;
}