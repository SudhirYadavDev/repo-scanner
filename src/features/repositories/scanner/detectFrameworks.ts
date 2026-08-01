const FRAMEWORKS = [
  "next",
  "react",
  "vue",
  "nuxt",
  "angular",
  "svelte",
  "express",
  "nestjs",
  "fastify",
  "koa",
  "hono",
  "electron",
  "tauri",
  "prisma",
  "typeorm",
  "mongoose",
  "drizzle-orm",
  "tailwindcss",
  "vite",
  "webpack",
  "vitest",
  "jest",
  "cypress",
  "playwright",
  "eslint",
  "prettier",
];

export function detectFrameworks(
  dependencies: Record<string, string>
): string[] {
  return FRAMEWORKS.filter(
    (framework) => framework in dependencies
  );
}