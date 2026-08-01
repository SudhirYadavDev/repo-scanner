import { readFile } from "node:fs/promises";

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export async function readPackageJson(
  filePath: string
): Promise<PackageJson> {
  const content = await readFile(filePath, "utf8");

  return JSON.parse(content) as PackageJson;
}