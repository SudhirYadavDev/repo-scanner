"use client";

import { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import {
  Loader2,
  ArrowRight,
  Search,
  Star,
  GitFork,
  Globe,
  Lock,
} from "lucide-react";

import { scanRepository } from "../actions/scanRepository";
import { ImportedRepository } from "../types/importedRepository";

import { startOperation, finishOperation } from "@/lib/operationStatus";

interface ImportedRepositoryRowProps {
  repository: ImportedRepository;
}

export default function ImportedRepositoryRow({
  repository,
}: ImportedRepositoryRowProps) {
  const router = useRouter();

  const [isScanning, startTransition] = useTransition();
  const [hasReport, setHasReport] = useState(false);

  useEffect(() => {
    function updateCurrentReport() {
      const currentRepositoryId = sessionStorage.getItem(
        "currentReportRepositoryId",
      );

      setHasReport(currentRepositoryId === repository.id);
    }

    updateCurrentReport();

    window.addEventListener("report-updated", updateCurrentReport);

    return () => {
      window.removeEventListener("report-updated", updateCurrentReport);
    };
  }, [repository.id]);

  function handleScan() {
    startOperation("scan");

    startTransition(async () => {
      try {
        await scanRepository(repository.id);

        sessionStorage.setItem("currentReportRepositoryId", repository.id);

        setHasReport(true);

        window.dispatchEvent(new Event("report-updated"));
      } finally {
        setTimeout(() => {
          finishOperation();
        }, 800);
      }
    });
  }

  return (
    <tr className="border-b border-zinc-200 transition-colors duration-200 hover:bg-zinc-50">
      <td
        className="truncate px-4 py-4 font-medium text-zinc-800"
        title={repository.fullName}
      >
        {repository.fullName}
      </td>

      <td className="truncate px-4 py-4">
        {repository.language ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {repository.language}
          </span>
        ) : (
          <span className="text-zinc-400">-</span>
        )}
      </td>

      <td className="px-4 py-4">
        {repository.visibility === "public" ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            <Globe size={12} />
            Public
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            <Lock size={12} />
            Private
          </span>
        )}
      </td>

      <td className="px-4 py-4 text-right">
        <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
          <Star size={15} className="fill-amber-400 text-amber-500" />
          {repository.stars}
        </span>
      </td>

      <td className="px-4 py-4 text-right">
        <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
          <GitFork size={15} className="text-cyan-600" />
          {repository.forks}
        </span>
      </td>

      <td className="px-4 py-4 text-center">
        {hasReport ? (
          <button
            onClick={() => router.push("/dashboard/reports")}
            className="group inline-flex h-9 w-28 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-md"
          >
            View
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        ) : (
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="group inline-flex h-9 w-28 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search size={14} />
                Scan
              </>
            )}
          </button>
        )}
      </td>

      <td
        className="truncate px-4 py-4 text-sm text-zinc-600"
        title={
          repository.lastSyncedAt
            ? new Date(repository.lastSyncedAt).toLocaleString()
            : "-"
        }
      >
        {repository.lastSyncedAt
          ? new Date(repository.lastSyncedAt).toLocaleString()
          : "-"}
      </td>
    </tr>
  );
}
