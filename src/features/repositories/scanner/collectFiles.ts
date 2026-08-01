import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { IGNORED_DIRECTORIES } from "./ignoredDirectories";

export async function collectFiles(
  directory: string
): Promise<string[]> {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files: string[] = [];

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      IGNORED_DIRECTORIES.has(entry.name)
    ) {
      continue;
    }

    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectFiles(fullPath);

      files.push(...nestedFiles);
      continue;
    }

    files.push(fullPath);
  }

  return files;
}