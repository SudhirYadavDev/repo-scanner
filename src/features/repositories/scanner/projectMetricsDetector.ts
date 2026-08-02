import { basename } from "node:path";

import { ProjectMetrics } from "./projectMetrics";

export function detectProjectMetrics(files: string[]): ProjectMetrics {
  const normalized = files.map((file) =>
    file.replaceAll("\\", "/").toLowerCase(),
  );

  return {
    sourceFiles: normalized.filter((file) => /\.(ts|tsx|js|jsx)$/.test(file))
      .length,

    configFiles: normalized.filter((file) => {
      const name = basename(file);

      return (
        name.startsWith("tsconfig") ||
        name.startsWith("eslint") ||
        name.startsWith("prettier") ||
        name.startsWith("vite.config") ||
        name.startsWith("next.config") ||
        name.startsWith("tailwind.config") ||
        name.startsWith("postcss.config")
      );
    }).length,

    documentationFiles: normalized.filter((file) => file.endsWith(".md"))
      .length,

    imageFiles: normalized.filter((file) =>
      /\.(png|jpg|jpeg|gif|svg|webp|ico)$/.test(file),
    ).length,

    apiRoutes: normalized.filter((file) => file.includes("/api/")).length,

    reactComponents: normalized.filter((file) => file.endsWith(".tsx")).length,

    pages: normalized.filter(
      (file) => file.includes("/app/") && file.endsWith("/page.tsx"),
    ).length,
  };
}
