"use client";

import { ImportedRepository } from "../types/importedRepository";
import ImportedRepositoryRow from "./ImportedRepositoryRow";

import { RepositoryScanResult } from "../scanner/scanResult";

interface ImportedRepositoryTableProps {
  repositories: ImportedRepository[];
  onScanComplete: (result: RepositoryScanResult) => void;
}

export default function ImportedRepositoryTable({
  repositories,
  onScanComplete,
}: ImportedRepositoryTableProps) {
  if (repositories.length === 0) {
    return (
      <div className="mt-10 border border-gray-300 bg-white p-8 text-center text-gray-500">
        No repositories have been imported yet.
      </div>
    );
  }

  return (
    <div className="mt-10 border border-gray-300 bg-white">
      <div className="border-b border-gray-300 px-5 py-3">
        <h2 className="text-lg font-semibold">Imported Repositories</h2>
      </div>

      <table className="min-w-full">
        <thead className="border-b border-gray-300 bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Repository</th>
            <th className="px-4 py-3 text-left">Language</th>
            <th className="px-4 py-3 text-left">Visibility</th>
            <th className="px-4 py-3 text-right">Stars</th>
            <th className="px-4 py-3 text-right">Forks</th>
            <th className="px-4 py-3 text-center">Actions</th>
            <th className="px-4 py-3 text-left">Last Synced</th>
          </tr>
        </thead>

        <tbody>
          {repositories.map((repository) => (
            <ImportedRepositoryRow
              key={repository.id}
              repository={repository}
              onScanComplete={onScanComplete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
