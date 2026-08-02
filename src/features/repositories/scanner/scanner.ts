import { Repository } from "@prisma/client";

import { db } from "@/lib/db";

import { buildFileInventory } from "./fileInventory";
import { cleanup } from "./cleanup";
import { cloneRepository } from "./cloneRepository";
import { collectFiles } from "./collectFiles";
import { countLines } from "./lineCounter";
import { detectFrameworks } from "./frameworkDetector";
import { findFile } from "./findFile";
import { readPackageJson } from "./readPackageJson";
import { RepositoryScanResult } from "./scanResult";
import { detectPackageManager } from "./packageManagerDetector";
import { detectDocker } from "./dockerDetector";
import { detectCI } from "./ciDetector";

export async function runRepositoryScan(repository: Repository) {
  const account = await db.account.findFirst({
    where: {
      userId: repository.userId,
      providerId: "github",
    },
  });

  if (!account?.accessToken) {
    throw new Error("GitHub access token not found.");
  }

  const scanDirectory = await cloneRepository(
    repository,
    account.accessToken
  );

  try {
    const files = await collectFiles(scanDirectory);

    const scanResult: RepositoryScanResult = buildFileInventory(files);

    scanResult.totalLines = await countLines(files);

    const packageJson = findFile(files, "package.json");

    if (packageJson) {
      const packageData = await readPackageJson(packageJson);

      scanResult.frameworks = detectFrameworks({
        ...(packageData.dependencies ?? {}),
        ...(packageData.devDependencies ?? {}),
      });

      scanResult.packageManager = detectPackageManager(files);

      scanResult.docker = detectDocker(files);

      scanResult.ci = detectCI(files);
    }

    console.log(scanResult);

    return scanResult;
  } finally {
    await cleanup(scanDirectory);
  }
}