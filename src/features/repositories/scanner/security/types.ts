export type SecuritySeverity = "Low" | "Medium" | "High" | "Critical";

export interface SecurityIssue {
  type: string;
  severity: SecuritySeverity;

  file: string;
  line: number;

  message: string;
}

export interface SecurityScanResult {
  score: number;

  issues: SecurityIssue[];
}
