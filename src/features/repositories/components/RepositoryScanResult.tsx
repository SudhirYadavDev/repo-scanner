import { RepositoryScanResult as ScanResult } from "../scanner/scanResult";

import BadgeSection from "./BadgeSection";
import MetricsGrid from "./MetricsGrid";

interface RepositoryScanResultProps {
  result: ScanResult | null;
}

export default function RepositoryScanResult({
  result,
}: RepositoryScanResultProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="mt-10 space-y-6">
      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Scan Summary</h2>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Files</p>
            <p className="text-2xl font-bold">{result.totalFiles}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Directories</p>
            <p className="text-2xl font-bold">{result.totalDirectories}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Lines of Code</p>
            <p className="text-2xl font-bold">{result.totalLines}</p>
          </div>
        </div>
      </div>

      <BadgeSection
        title="Detected Frameworks"
        items={result.frameworks}
        color="green"
      />

      <BadgeSection
        title="Package Manager"
        items={result.packageManager}
        color="blue"
      />

      <BadgeSection title="Docker" items={result.docker} color="blue" />

      <BadgeSection title="CI / CD" items={result.ci} color="purple" />

      <BadgeSection
        title="Database & ORM"
        items={result.database}
        color="green"
      />

      <BadgeSection title="Testing" items={result.testing} color="orange" />

      <BadgeSection
        title="Code Quality"
        items={result.quality}
        color="purple"
      />

      <BadgeSection
        title="Environment Files"
        items={result.environment}
        color="blue"
      />

      <BadgeSection
        title="Project Structure"
        items={result.structure}
        color="green"
      />

      <MetricsGrid metrics={result.metrics} />

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">File Extensions</h2>

        <table className="min-w-full">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-2 text-left">Extension</th>
              <th className="py-2 text-right">Files</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(result.extensions).map(([extension, count]) => (
              <tr key={extension} className="border-b border-gray-200">
                <td className="py-2">{extension}</td>
                <td className="py-2 text-right">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
