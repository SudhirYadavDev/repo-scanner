export interface RepositoryScanResult {
  totalFiles: number;
  totalDirectories: number;
  totalLines: number;

  extensions: Record<string, number>;

  frameworks: {
    next: boolean;
    react: boolean;
    prisma: boolean;
    tailwind: boolean;
    express: boolean;
    nest: boolean;
    vue: boolean;
    angular: boolean;
  };
}