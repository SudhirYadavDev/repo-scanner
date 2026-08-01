"use client";

import { useTransition } from "react";

import { scanRepository } from "../actions/scanRepository";
import { RepositoryScanResult } from "../scanner/scanResult";
import { ImportedRepository } from "../types/importedRepository";

interface ImportedRepositoryRowProps {
  repository: ImportedRepository;
  onScanComplete: (result: RepositoryScanResult) => void;
}

export default function ImportedRepositoryRow({
  repository,
  onScanComplete,
}: ImportedRepositoryRowProps) {
  const [isScanning, startTransition] = useTransition();

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3">{repository.fullName}</td>

      <td className="px-4 py-3">{repository.language ?? "-"}</td>

      <td className="px-4 py-3">{repository.visibility}</td>

      <td className="px-4 py-3 text-right">{repository.stars}</td>

      <td className="px-4 py-3 text-right">{repository.forks}</td>

      <td className="px-4 py-3 text-center">
        <button
          onClick={() =>
            startTransition(async () => {
              const result = await scanRepository(repository.id);
              onScanComplete(result);
            })
          }
          disabled={isScanning}
          className="border border-blue-600 bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isScanning ? "Scanning..." : "Scan"}
        </button>
      </td>

      <td className="px-4 py-3">
        {repository.lastSyncedAt
          ? new Date(repository.lastSyncedAt).toLocaleString()
          : "-"}
      </td>
    </tr>
  );
}
