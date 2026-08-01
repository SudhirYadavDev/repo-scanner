import { basename } from "node:path";

export function findFile(
  files: string[],
  fileName: string
): string | undefined {
  return files.find((file) => basename(file) === fileName);
}