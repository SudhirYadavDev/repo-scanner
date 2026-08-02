import { SecuritySeverity } from "./types";

export interface SecurityPattern {
  name: string;

  regex: RegExp;

  severity: SecuritySeverity;

  message: string;
}

export const SECURITY_PATTERNS: SecurityPattern[] = [
  {
    name: "OpenAI API Key",
    regex: /\bsk-[A-Za-z0-9]{32,}\b/g,
    severity: "High",
    message: "OpenAI API key detected.",
  },

  {
    name: "GitHub Token",
    regex: /\bghp_[A-Za-z0-9]{36}\b/g,
    severity: "High",
    message: "GitHub Personal Access Token detected.",
  },

  {
    name: "AWS Access Key",
    regex: /\bAKIA[0-9A-Z]{16}\b/g,
    severity: "Critical",
    message: "AWS Access Key detected.",
  },

  {
    name: "JWT Secret",
    regex: /jwt.?secret\s*[:=]\s*['"`].+['"`]/gi,
    severity: "High",
    message: "Hardcoded JWT secret detected.",
  },

  {
    name: "Password",
    regex: /password\s*[:=]\s*['"`].+['"`]/gi,
    severity: "Medium",
    message: "Hardcoded password detected.",
  },

  {
    name: "MongoDB URI",
    regex: /mongodb(\+srv)?:\/\/[^\s'"]+/gi,
    severity: "High",
    message: "MongoDB connection string detected.",
  },

  {
    name: "PostgreSQL URI",
    regex: /postgres(ql)?:\/\/[^\s'"]+/gi,
    severity: "High",
    message: "PostgreSQL connection string detected.",
  },

  {
    name: "MySQL URI",
    regex: /mysql:\/\/[^\s'"]+/gi,
    severity: "Medium",
    message: "MySQL connection string detected.",
  },
];
