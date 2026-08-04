import pLimit from "p-limit";

import {
  getRepositoryFile,
  getRepositoryTree,
} from "../services/github";

import { RepositoryFile } from "./repositoryFile";

const TEXT_EXTENSIONS = new Set([
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "md",
  "css",
  "scss",
  "html",
  "yml",
  "yaml",
  "env",
  "txt",
  "xml",
  "sql",
  "java",
  "kt",
  "go",
  "py",
  "php",
  "rb",
  "cs",
  "c",
  "cpp",
  "h",
  "hpp",
  "swift",
  "rs",
  "sh",
]);

function isTextFile(path: string) {
  const extension = path.split(".").pop()?.toLowerCase();

  if (!extension) {
    return false;
  }

  return TEXT_EXTENSIONS.has(extension);
}

export async function downloadRepositoryFiles(
  owner: string,
  repository: string,
  accessToken: string,
): Promise<RepositoryFile[]> {
  const tree = await getRepositoryTree(owner, repository, accessToken);

  const files = tree.tree.filter(
    (item) => item.type === "blob" && isTextFile(item.path),
  );

  const limit = pLimit(10);

  const downloaded = await Promise.all(
    files.map((file) =>
      limit(async () => {
        try {
          const content = await getRepositoryFile(
            owner,
            repository,
            file.path,
            accessToken,
          );

          return {
            path: file.path,
            content,
          };
        } catch {
          return null;
        }
      }),
    ),
  );

  return downloaded.filter(
    (file): file is RepositoryFile => file !== null,
  );
}