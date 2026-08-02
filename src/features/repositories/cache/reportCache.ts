import { RepositoryScanResult } from "../scanner/scanResult";

interface CachedReport {
  repositoryId: string;
  repositoryName: string;
  scannedAt: Date;
  report: RepositoryScanResult;
}

let cachedReport: CachedReport | null = null;

export function saveCachedReport(report: CachedReport) {
  cachedReport = report;
}

export function getCachedReport() {
  return cachedReport;
}

export function clearCachedReport() {
  cachedReport = null;
}