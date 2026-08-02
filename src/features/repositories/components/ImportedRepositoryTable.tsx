"use client";

import { ImportedRepository } from "../types/importedRepository";
import ImportedRepositoryRow from "./ImportedRepositoryRow";

interface ImportedRepositoryTableProps {
  repositories: ImportedRepository[];
}

export default function ImportedRepositoryTable({
  repositories,
}: ImportedRepositoryTableProps) {
  if (repositories.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
        No repositories have been imported yet.
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="h-full overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-100">
            <tr>
              <th className="w-[30%] px-4 py-3 text-left font-semibold">
                Repository
              </th>

              <th className="w-[12%] px-4 py-3 text-left font-semibold">
                Language
              </th>

              <th className="w-[12%] px-4 py-3 text-left font-semibold">
                Visibility
              </th>

              <th className="w-[8%] px-4 py-3 text-right font-semibold">
                Stars
              </th>

              <th className="w-[8%] px-4 py-3 text-right font-semibold">
                Forks
              </th>

              <th className="w-[15%] px-4 py-3 text-center font-semibold">
                Action
              </th>

              <th className="w-[15%] px-4 py-3 text-left font-semibold">
                Last Synced
              </th>
            </tr>
          </thead>

          <tbody>
            {repositories.map((repository) => (
              <ImportedRepositoryRow
                key={repository.id}
                repository={repository}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
