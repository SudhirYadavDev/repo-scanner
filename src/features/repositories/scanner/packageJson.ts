import { readRepositoryFile } from "./readFile";

export async function readPackageJson(path: string) {
  const content = await readRepositoryFile(path);

  return JSON.parse(content) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}