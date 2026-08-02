import { dirname, extname } from "node:path";

import { RepositoryScanResult } from "./scanResult";

export function buildFileInventory(files: string[]): RepositoryScanResult {
  const directories = new Set<string>();
  const extensions: Record<string, number> = {};

  for (const file of files) {
    directories.add(dirname(file));

    const extension = extname(file).replace(".", "") || "none";

    extensions[extension] = (extensions[extension] ?? 0) + 1;
  }

  return {
    totalFiles: files.length,
    totalDirectories: directories.size,
    totalLines: 0,
    extensions,

    frameworks: {
      next: false,
      react: false,
      prisma: false,
      tailwind: false,
      express: false,
      nest: false,
      vue: false,
      angular: false,
    },

    packageManager: {
      npm: false,
      pnpm: false,
      yarn: false,
      bun: false,
    },

    docker: {
      dockerfile: false,
      compose: false,
    },
  };
}
