"use client";

import {
  FolderGit2,
  Code2,
  ShieldCheck,
  Star,
  GitFork,
  Activity,
  Clock3,
} from "lucide-react";

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
    <div className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="h-full overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 backdrop-blur">
            <tr className="text-zinc-700">
              <th className="w-[32%] px-4 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <FolderGit2 size={17} className="text-sky-600" />
                  Repository
                </div>
              </th>

              <th className="w-[14%] px-4 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <Code2 size={17} className="text-emerald-600" />
                  Language
                </div>
              </th>

              <th className="w-[12%] px-4 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck size={17} className="text-violet-600" />
                  Visibility
                </div>
              </th>

              <th className="w-[9%] px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2 font-semibold">
                  <Star
                    size={17}
                    className="fill-amber-400 text-amber-500"
                  />
                  Stars
                </div>
              </th>

              <th className="w-[9%] px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2 font-semibold">
                  <GitFork size={17} className="text-cyan-600" />
                  Forks
                </div>
              </th>

              <th className="w-[12%] px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <Activity size={17} className="text-rose-600" />
                  Action
                </div>
              </th>

              <th className="w-[12%] px-4 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock3 size={17} className="text-zinc-600" />
                  Synced
                </div>
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