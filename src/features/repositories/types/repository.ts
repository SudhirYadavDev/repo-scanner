export interface RepositoryListItem {
  githubId: number;
  name: string;
  fullName: string;
  owner: string;
  language: string | null;
  isPrivate: boolean;
  stars: number;
  forks: number;

  selected: boolean;
}