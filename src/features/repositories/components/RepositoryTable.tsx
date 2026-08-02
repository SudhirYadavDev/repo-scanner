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
    <div className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="h-full overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-100">
            <tr>
              <th className="w-12 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  onChange={onToggleAll}
                  checked={
                    repositories.length > 0 &&
                    repositories.every((repository) => repository.selected)
                  }
                />
              </th>

              <th className="w-[32%] px-4 py-3 text-left font-semibold">
                Repository
              </th>

              <th className="w-[20%] px-4 py-3 text-left font-semibold">
                Owner
              </th>

              <th className="w-[14%] px-4 py-3 text-left font-semibold">
                Language
              </th>

              <th className="w-[12%] px-4 py-3 text-left font-semibold">
                Visibility
              </th>

              <th className="w-[11%] px-4 py-3 text-right font-semibold">
                Stars
              </th>

              <th className="w-[11%] px-4 py-3 text-right font-semibold">
                Forks
              </th>
            </tr>
          </thead>

          <tbody>
            {repositories.map((repo) => (
              <tr
                key={repo.githubId}
                className="border-b border-zinc-200 hover:bg-zinc-50"
              >
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={repo.selected}
                    onChange={() => onToggle(repo.githubId)}
                  />
                </td>

                <td
                  className="truncate px-4 py-3 font-medium"
                  title={repo.name}
                >
                  {repo.name}
                </td>

                <td
                  className="truncate px-4 py-3 text-zinc-600"
                  title={repo.owner}
                >
                  {repo.owner}
                </td>

                <td className="truncate px-4 py-3">{repo.language ?? "-"}</td>

                <td className="px-4 py-3">
                  {repo.isPrivate ? "Private" : "Public"}
                </td>

                <td className="px-4 py-3 text-right">{repo.stars}</td>

                <td className="px-4 py-3 text-right">{repo.forks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
