export type SecuritySeverity = "Low" | "Medium" | "High" | "Critical";

export interface SecurityIssue {
  type: string;
  severity: SecuritySeverity;

  file: string;
  line: number;

  message: string;

  source: "Pattern Scanner" | "GitLeaks";
}

export interface SecurityScanResult {
  score: number;

  issues: SecurityIssue[];

  summary: {
    totalIssues: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}
