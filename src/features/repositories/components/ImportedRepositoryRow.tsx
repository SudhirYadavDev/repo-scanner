"use client";

import { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

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
    <tr className="border-b border-zinc-200 hover:bg-zinc-50">
      <td
        className="truncate px-4 py-3 font-medium"
        title={repository.fullName}
      >
        {repository.fullName}
      </td>

      <td className="truncate px-4 py-3">{repository.language ?? "-"}</td>

      <td className="px-4 py-3">{repository.visibility}</td>

      <td className="px-4 py-3 text-right">{repository.stars}</td>

      <td className="px-4 py-3 text-right">{repository.forks}</td>

      <td className="px-4 py-3 text-center">
        {hasReport ? (
          <button
            onClick={() => router.push("/dashboard/reports")}
            className="w-28 rounded-lg border border-emerald-600 bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700"
          >
            View Report
          </button>
        ) : (
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-28 rounded-lg border border-blue-600 bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isScanning ? "Scanning..." : "Scan"}
          </button>
        )}
      </td>

      <td
        className="truncate px-4 py-3 text-sm text-zinc-600"
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
