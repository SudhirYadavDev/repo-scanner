"use client";

import { generateRepositoryPdf } from "../utils/generateRepositoryPdf";
import { RepositoryScanResult } from "../scanner/scanResult";

interface DownloadReportButtonProps {
  repositoryName: string;
  scannedAt: Date;
  report: RepositoryScanResult;
}

export default function DownloadReportButton({
  repositoryName,
  scannedAt,
  report,
}: DownloadReportButtonProps) {
  return (
    <button
      onClick={() =>
        generateRepositoryPdf(
          repositoryName,
          scannedAt.toISOString(),
          report,
        )
      }
      className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
    >
      Download PDF Report
    </button>
  );
}