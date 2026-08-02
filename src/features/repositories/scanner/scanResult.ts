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

  packageManager: {
    npm: boolean;
    pnpm: boolean;
    yarn: boolean;
    bun: boolean;
  };

  docker: {
    dockerfile: boolean;
    compose: boolean;
  };

  ci: {
    githubActions: boolean;
    gitlab: boolean;
    jenkins: boolean;
    circleCi: boolean;
    azurePipelines: boolean;
    travis: boolean;
  };
}
