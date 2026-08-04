import { relative } from "node:path";

import { readRepositoryFile } from "../readFile";

import { SECURITY_PATTERNS } from "./patterns";
import { detectGitLeaks } from "./gitLeaksScanner";
import { SecurityIssue, SecurityScanResult } from "./types";

export async function detectSecurity(
  files: string[],
  rootDirectory: string,
): Promise<SecurityScanResult> {
  const issues: SecurityIssue[] = [];

  for (const file of files) {
    let content = "";

    try {
      content = await readRepositoryFile(file);
    } catch {
      continue;
    }

    const lines = content.split(/\r?\n/);

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];

      for (const pattern of SECURITY_PATTERNS) {
        pattern.regex.lastIndex = 0;

        if (!pattern.regex.test(line)) {
          continue;
        }

        issues.push({
          type: pattern.name,
          severity: pattern.severity,
          file: relative(rootDirectory, file),
          line: lineNumber + 1,
          message: pattern.message,
          source: "Pattern Scanner",
        });
      }
    }
  }

  let gitLeaksIssues: SecurityIssue[] = [];

  try {
    gitLeaksIssues = await detectGitLeaks(rootDirectory);
  } catch (error) {
    console.warn("GitLeaks unavailable, skipping GitLeaks scan.");
  }

  issues.push(...gitLeaksIssues);

  const uniqueIssues = Array.from(
    new Map(
      issues.map((issue) => [
        `${issue.type}-${issue.file}-${issue.line}`,
        issue,
      ]),
    ).values(),
  );

  let score = 100;

  for (const issue of uniqueIssues) {
    switch (issue.severity) {
      case "Critical":
        score -= 20;
        break;

      case "High":
        score -= 10;
        break;

      case "Medium":
        score -= 5;
        break;

      case "Low":
        score -= 2;
        break;
    }
  }

  const summary = {
    totalIssues: uniqueIssues.length,
    critical: uniqueIssues.filter((issue) => issue.severity === "Critical")
      .length,
    high: uniqueIssues.filter((issue) => issue.severity === "High").length,
    medium: uniqueIssues.filter((issue) => issue.severity === "Medium").length,
    low: uniqueIssues.filter((issue) => issue.severity === "Low").length,
  };

  return {
    score: Math.max(score, 0),
    issues: uniqueIssues,
    summary,
  };
}
