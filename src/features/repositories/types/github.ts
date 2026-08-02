export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
}

export interface GitHubStats {
  totalRepositories: number;
  totalStars: number;
  publicRepositories: number;
  privateRepositories: number;
  totalContributions: number;
  currentYearContributions: number;
}