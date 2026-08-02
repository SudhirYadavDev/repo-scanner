import { basename } from "node:path";

export function detectPackageManager(files: string[]) {
  const fileNames = files.map((file) => basename(file));

  return {
    npm: fileNames.includes("package-lock.json"),
    pnpm: fileNames.includes("pnpm-lock.yaml"),
    yarn: fileNames.includes("yarn.lock"),
    bun:
      fileNames.includes("bun.lock") ||
      fileNames.includes("bun.lockb"),
  };
}