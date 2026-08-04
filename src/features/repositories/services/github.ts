import {
  GitHubContentResponse,
  GitHubRepository,
  GitHubTreeResponse,
} from "../types/github";

const GITHUB_HEADERS = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

export async function getUserRepositories(
  accessToken: string,
): Promise<GitHubRepository[]> {
  const response = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: GITHUB_HEADERS(accessToken),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories.");
  }

  return response.json();
}

export async function getRepositoryTree(
  owner: string,
  repository: string,
  accessToken: string,
): Promise<GitHubTreeResponse> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repository}/git/trees/HEAD?recursive=1`,
    {
      headers: GITHUB_HEADERS(accessToken),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository tree.");
  }

  return response.json();
}

export async function getRepositoryFile(
  owner: string,
  repository: string,
  path: string,
  accessToken: string,
): Promise<string> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repository}/contents/${encodeURIComponent(path)}`,
    {
      headers: GITHUB_HEADERS(accessToken),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  const file: GitHubContentResponse = await response.json();

  return Buffer.from(file.content, "base64").toString("utf8");
}
