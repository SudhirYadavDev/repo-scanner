import { ProjectMetrics } from "./projectMetrics";
import { SecurityScanResult } from "./security/types";
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

  database: {
    postgres: boolean;
    mysql: boolean;
    mariadb: boolean;
    mongodb: boolean;
    sqlite: boolean;
    redis: boolean;
    prisma: boolean;
    drizzle: boolean;
    mongoose: boolean;
  };

  testing: {
    jest: boolean;
    vitest: boolean;
    cypress: boolean;
    playwright: boolean;
    mocha: boolean;
    chai: boolean;
    testingLibrary: boolean;
  };

  quality: {
    eslint: boolean;
    prettier: boolean;
    husky: boolean;
    lintStaged: boolean;
    commitlint: boolean;
    biome: boolean;
    stylelint: boolean;
  };

  environment: {
    env: boolean;
    envLocal: boolean;
    envExample: boolean;
    envDevelopment: boolean;
    envProduction: boolean;
  };

  structure: {
    src: boolean;
    app: boolean;
    pages: boolean;
    components: boolean;
    hooks: boolean;
    services: boolean;
    lib: boolean;
    utils: boolean;
    middleware: boolean;
    public: boolean;
    assets: boolean;
    prisma: boolean;
    tests: boolean;
  };

  metrics: ProjectMetrics;

   security: SecurityScanResult;

  score: {
    overall: number;

    rating: "Excellent" | "Good" | "Average" | "Poor";

    passed: string[];
    missing: string[];
  };
}
