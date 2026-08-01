export interface ImportedRepository {
  id: string;
  githubId: number;
  name: string;
  fullName: string;
  owner: string;
  language: string | null;
  isPrivate: boolean;
  visibility: string;
  stars: number;
  forks: number;
  lastSyncedAt: Date | null;
}