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
import { detectDatabase } from "./databaseDetector";
import { detectTesting } from "./testingDetector";
import { detectQuality } from "./qualityDetector";
import { detectEnvironment } from "./environmentDetector";
import { detectStructure } from "./structureDetector";
import { detectProjectMetrics } from "./projectMetricsDetector";
import { calculateRepositoryScore } from "./scoreDetector";
import { detectSecurity } from "./security/detector";

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

  const scanDirectory = await cloneRepository(repository, account.accessToken);

  try {
    const files = await collectFiles(scanDirectory);

    const scanResult: RepositoryScanResult = buildFileInventory(files);

    scanResult.totalLines = await countLines(files);

    const packageJson = findFile(files, "package.json");

    if (packageJson) {
      const packageData = await readPackageJson(packageJson);

      const dependencies = {
        ...(packageData.dependencies ?? {}),
        ...(packageData.devDependencies ?? {}),
      };

      scanResult.frameworks = detectFrameworks(dependencies);

      scanResult.database = detectDatabase(dependencies);

      scanResult.testing = detectTesting(dependencies);

      scanResult.quality = detectQuality(dependencies);
    }

    scanResult.environment = detectEnvironment(files);

    scanResult.structure = detectStructure(files);

    scanResult.packageManager = detectPackageManager(files);

    scanResult.docker = detectDocker(files);

    scanResult.ci = detectCI(files);

    scanResult.metrics = detectProjectMetrics(files);

    scanResult.security = await detectSecurity(files, scanDirectory);

    scanResult.score = calculateRepositoryScore(scanResult);

    console.log(scanResult);

    return scanResult;
  } finally {
    await cleanup(scanDirectory);
  }
}
