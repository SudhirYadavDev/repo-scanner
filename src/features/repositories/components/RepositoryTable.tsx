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
      <div className="mt-6 border border-gray-300 bg-white p-8 text-center text-gray-500">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead className="border-b border-gray-300 bg-gray-100">
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

            <th className="px-4 py-3 text-left font-semibold">Repository</th>

            <th className="px-4 py-3 text-left font-semibold">Owner</th>

            <th className="px-4 py-3 text-left font-semibold">Language</th>

            <th className="px-4 py-3 text-left font-semibold">Visibility</th>

            <th className="px-4 py-3 text-right font-semibold">Stars</th>

            <th className="px-4 py-3 text-right font-semibold">Forks</th>
          </tr>
        </thead>

        <tbody>
          {repositories.map((repo) => (
            <tr
              key={repo.githubId}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={repo.selected}
                  onChange={() => onToggle(repo.githubId)}
                />
              </td>

              <td className="px-4 py-3 font-medium">{repo.name}</td>

              <td className="px-4 py-3 text-gray-600">{repo.owner}</td>

              <td className="px-4 py-3">{repo.language ?? "-"}</td>

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
  );
}
