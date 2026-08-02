import { readFile } from "node:fs/promises";

export async function readRepositoryFile(path: string): Promise<string> {
  return readFile(path, "utf8");
}

export { readFile };
