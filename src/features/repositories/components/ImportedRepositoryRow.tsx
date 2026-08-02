"use client";

import { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { scanRepository } from "../actions/scanRepository";
import { ImportedRepository } from "../types/importedRepository";

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

  async function handleScan() {
  startTransition(async () => {
    await scanRepository(repository.id);

    sessionStorage.setItem("currentReportRepositoryId", repository.id);

    setHasReport(true);

    window.dispatchEvent(new Event("report-updated"));
  });
}

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3">{repository.fullName}</td>

      <td className="px-4 py-3">{repository.language ?? "-"}</td>

      <td className="px-4 py-3">{repository.visibility}</td>

      <td className="px-4 py-3 text-right">{repository.stars}</td>

      <td className="px-4 py-3 text-right">{repository.forks}</td>

      <td className="px-4 py-3 text-center">
        {hasReport ? (
          <button
            onClick={() => router.push("/dashboard/reports")}
            className="rounded-lg border border-emerald-600 bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
          >
            View Report
          </button>
        ) : (
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="rounded-lg border border-blue-600 bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isScanning ? "Scanning..." : "Scan"}
          </button>
        )}
      </td>

      <td className="px-4 py-3">
        {repository.lastSyncedAt
          ? new Date(repository.lastSyncedAt).toLocaleString()
          : "-"}
      </td>
    </tr>
  );
}
