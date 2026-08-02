import { dirname, extname } from "node:path";

import { RepositoryScanResult } from "./scanResult";

export function buildFileInventory(files: string[]): RepositoryScanResult {
  const directories = new Set<string>();
  const extensions: Record<string, number> = {};

  for (const file of files) {
    directories.add(dirname(file));

    const extension = extname(file).replace(".", "") || "none";

    extensions[extension] = (extensions[extension] ?? 0) + 1;
  }

  return {
    totalFiles: files.length,
    totalDirectories: directories.size,
    totalLines: 0,
    extensions,

    frameworks: {
      next: false,
      react: false,
      prisma: false,
      tailwind: false,
      express: false,
      nest: false,
      vue: false,
      angular: false,
    },

    packageManager: {
      npm: false,
      pnpm: false,
      yarn: false,
      bun: false,
    },

    docker: {
      dockerfile: false,
      compose: false,
    },

    ci: {
      githubActions: false,
      gitlab: false,
      jenkins: false,
      circleCi: false,
      azurePipelines: false,
      travis: false,
    },

    database: {
      postgres: false,
      mysql: false,
      mariadb: false,
      mongodb: false,
      sqlite: false,
      redis: false,
      prisma: false,
      drizzle: false,
      mongoose: false,
    },

    testing: {
      jest: false,
      vitest: false,
      cypress: false,
      playwright: false,
      mocha: false,
      chai: false,
      testingLibrary: false,
    },

    quality: {
      eslint: false,
      prettier: false,
      husky: false,
      lintStaged: false,
      commitlint: false,
      biome: false,
      stylelint: false,
    },

    environment: {
      env: false,
      envLocal: false,
      envExample: false,
      envDevelopment: false,
      envProduction: false,
    },

    structure: {
      src: false,
      app: false,
      pages: false,
      components: false,
      hooks: false,
      services: false,
      lib: false,
      utils: false,
      middleware: false,
      public: false,
      assets: false,
      prisma: false,
      tests: false,
    },

    metrics: {
      sourceFiles: 0,
      configFiles: 0,
      documentationFiles: 0,
      imageFiles: 0,
      apiRoutes: 0,
      reactComponents: 0,
      pages: 0,
    },
  };
}
