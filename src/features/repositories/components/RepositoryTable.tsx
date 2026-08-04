import {
  FolderGit2,
  User,
  Code2,
  ShieldCheck,
  Star,
  GitFork,
  Globe,
  Lock,
} from "lucide-react";

import { RepositoryListItem } from "../types/repository";

interface RepositoryTableProps {
  repositories: RepositoryListItem[];
  onToggle: (githubId: number) => void;
  onToggleAll: () => void;
}

export default function RepositoryTable({
  repositories,
  onToggle,
  onToggleAll,
}: RepositoryTableProps) {
  if (repositories.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="h-full overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 backdrop-blur">
            <tr className="text-zinc-700">
              <th className="w-12 px-4 py-4 text-center">
                <input
                  type="checkbox"
                  onChange={onToggleAll}
                  checked={
                    repositories.length > 0 &&
                    repositories.every((repository) => repository.selected)
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
                />
              </th>

              <th className="w-[32%] px-4 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <FolderGit2 size={17} className="text-sky-600" />
                  Repository
                </div>
              </th>

              <th className="w-[20%] px-4 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <User size={17} className="text-violet-600" />
                  Owner
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
                  <ShieldCheck size={17} className="text-cyan-600" />
                  Visibility
                </div>
              </th>

              <th className="w-[11%] px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2 font-semibold">
                  <Star
                    size={17}
                    className="fill-amber-400 text-amber-500"
                  />
                  Stars
                </div>
              </th>

              <th className="w-[11%] px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2 font-semibold">
                  <GitFork size={17} className="text-cyan-600" />
                  Forks
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {repositories.map((repo) => (
              <tr
                key={repo.githubId}
                className="border-b border-zinc-200 transition-colors duration-200 hover:bg-zinc-50"
              >
                <td className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={repo.selected}
                    onChange={() => onToggle(repo.githubId)}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
                  />
                </td>

                <td
                  className="truncate px-4 py-4 font-medium text-zinc-800"
                  title={repo.name}
                >
                  {repo.name}
                </td>

                <td
                  className="truncate px-4 py-4 text-zinc-600"
                  title={repo.owner}
                >
                  {repo.owner}
                </td>

                <td className="truncate px-4 py-4">
                  {repo.language ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {repo.language}
                    </span>
                  ) : (
                    <span className="text-zinc-400">-</span>
                  )}
                </td>

                <td className="px-4 py-4">
                  {repo.isPrivate ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                      <Lock size={12} />
                      Private
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                      <Globe size={12} />
                      Public
                    </span>
                  )}
                </td>

                <td className="px-4 py-4 text-right">
                  <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
                    <Star
                      size={15}
                      className="fill-amber-400 text-amber-500"
                    />
                    {repo.stars}
                  </span>
                </td>

                <td className="px-4 py-4 text-right">
                  <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
                    <GitFork size={15} className="text-cyan-600" />
                    {repo.forks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}