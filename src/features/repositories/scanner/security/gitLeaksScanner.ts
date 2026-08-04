import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { unlink } from "node:fs/promises";

import { SecurityIssue } from "./types";

const execFileAsync = promisify(execFile);

interface GitLeaksResult {
  RuleID: string;
  File: string;
  StartLine: number;
  Description?: string;
}

export async function detectGitLeaks(
  rootDirectory: string,
): Promise<SecurityIssue[]> {
  const reportPath = join(rootDirectory, `.gitleaks-${randomUUID()}.json`);

  try {
    await execFileAsync(
      "gitleaks",
      [
        "detect",
        "--source",
        rootDirectory,
        "--report-format",
        "json",
        "--report-path",
        reportPath,
      ],
      {
        maxBuffer: 1024 * 1024 * 10,
      },
    );
  } catch (error) {
  console.error("GitLeaks failed:");
  console.error(error);
}

  try {
    const file = await import("node:fs/promises");

    const content = await file.readFile(reportPath, "utf-8");

    const findings: GitLeaksResult[] = JSON.parse(content);

    return findings.map((finding) => ({
      type: `GitLeaks: ${finding.RuleID}`,
      severity: "Critical",
      file: finding.File,
      line: finding.StartLine,
      message: finding.Description ?? "Secret detected by GitLeaks.",
      source: "GitLeaks",
    }));
  } catch {
    return [];
  } finally {
    await unlink(reportPath).catch(() => {});
  }
}
