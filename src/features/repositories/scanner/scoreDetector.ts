import { RepositoryScanResult } from "./scanResult";

export function calculateRepositoryScore(
  result: RepositoryScanResult,
): RepositoryScanResult["score"] {
  let score = 0;

  const passed: string[] = [];
  const missing: string[] = [];

  const checkGroup = (
    title: string,
    values: Record<string, boolean>,
    points: number,
  ) => {
    const enabled = Object.entries(values)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if (enabled.length > 0) {
      score += points;
      passed.push(`${title}: ${enabled.join(", ")}`);
    } else {
      missing.push(title);
    }
  };

  checkGroup("Frameworks", result.frameworks, 15);
  checkGroup("Package Manager", result.packageManager, 5);
  checkGroup("Docker", result.docker, 10);
  checkGroup("CI/CD", result.ci, 10);
  checkGroup("Database", result.database, 10);
  checkGroup("Testing", result.testing, 10);
  checkGroup("Code Quality", result.quality, 10);
  checkGroup("Environment", result.environment, 5);
  checkGroup("Project Structure", result.structure, 10);

  if (result.metrics.reactComponents > 0) {
    score += 5;
    passed.push("React Components");
  } else {
    missing.push("React Components");
  }

  if (result.metrics.apiRoutes > 0) {
    score += 5;
    passed.push("API Routes");
  } else {
    missing.push("API Routes");
  }

  if (result.metrics.documentationFiles > 0) {
    score += 5;
    passed.push("Documentation");
  } else {
    missing.push("Documentation");
  }

  const rating =
    score >= 85
      ? "Excellent"
      : score >= 65
        ? "Good"
        : score >= 40
          ? "Average"
          : "Poor";

  return {
    overall: score,
    rating,
    passed,
    missing,
  };
}
