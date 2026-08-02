export function detectQuality(dependencies: Record<string, string>) {
  return {
    eslint: "eslint" in dependencies,

    prettier: "prettier" in dependencies,

    husky: "husky" in dependencies,

    lintStaged: "lint-staged" in dependencies,

    commitlint: "@commitlint/cli" in dependencies,

    biome: "@biomejs/biome" in dependencies,

    stylelint: "stylelint" in dependencies,
  };
}
