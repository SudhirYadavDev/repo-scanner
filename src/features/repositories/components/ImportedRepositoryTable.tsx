"use client";

import { ImportedRepository } from "../types/importedRepository";

interface ImportedRepositoryTableProps {
  repositories: ImportedRepository[];
}

export default function ImportedRepositoryTable({
  repositories,
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
            <th className="px-4 py-3 text-left">Last Synced</th>
          </tr>
        </thead>

        <tbody>
          {repositories.map((repository) => (
            <tr
              key={repository.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">{repository.fullName}</td>

              <td className="px-4 py-3">{repository.language ?? "-"}</td>

              <td className="px-4 py-3">{repository.visibility}</td>

              <td className="px-4 py-3 text-right">{repository.stars}</td>

              <td className="px-4 py-3 text-right">{repository.forks}</td>

              <td className="px-4 py-3">
                {repository.lastSyncedAt
                  ? new Date(repository.lastSyncedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
