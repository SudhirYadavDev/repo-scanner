export function detectTesting(dependencies: Record<string, string>) {
  return {
    jest: "jest" in dependencies || "@types/jest" in dependencies,

    vitest: "vitest" in dependencies,

    cypress: "cypress" in dependencies,

    playwright:
      "@playwright/test" in dependencies || "playwright" in dependencies,

    mocha: "mocha" in dependencies,

    chai: "chai" in dependencies,

    testingLibrary:
      "@testing-library/react" in dependencies ||
      "@testing-library/dom" in dependencies ||
      "@testing-library/jest-dom" in dependencies,
  };
}
