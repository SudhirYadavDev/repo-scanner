"use client";

import { Download, FileText } from "lucide-react";

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
      className="group inline-flex items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-900 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg active:translate-y-0"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition group-hover:bg-white/20">
        <FileText size={18} />
      </div>

      <div className="flex flex-col items-start leading-none">
        <span className="text-sm">Download Report</span>

        <span className="mt-1 text-xs font-normal text-zinc-300">
          Export as PDF
        </span>
      </div>

      <Download
        size={18}
        className="ml-1 transition-transform duration-300 group-hover:translate-y-0.5"
      />
    </button>
  );
}