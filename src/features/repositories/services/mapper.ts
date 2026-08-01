import { GitHubRepository } from "../types/github";
import { RepositoryListItem } from "../types/repository";

export function mapGitHubRepository(
  repository: GitHubRepository
): RepositoryListItem {
  return {
    githubId: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    owner: repository.owner.login,
    language: repository.language,
    isPrivate: repository.private,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    selected: false,
  };
}