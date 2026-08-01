import { GitHubRepository } from "../types/github";

export async function getUserRepositories(
  accessToken: string
): Promise<GitHubRepository[]> {
  const response = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories.");
  }

  return response.json();
}