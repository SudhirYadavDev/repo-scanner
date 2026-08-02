import { readRepositoryFile } from "./readFile";

export async function countLines(files: string[]) {
  let totalLines = 0;

  for (const file of files) {
    try {
      const content = await readRepositoryFile(file);

      totalLines += content.split(/\r?\n/).length;
    } catch {
      // Ignore binary or unreadable files
    }
  }

  return totalLines;
}