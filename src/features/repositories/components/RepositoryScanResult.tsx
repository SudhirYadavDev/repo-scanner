import { RepositoryScanResult as ScanResult } from "../scanner/scanResult";

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

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Detected Frameworks</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.frameworks).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Package Manager</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.packageManager).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Docker</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.docker).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">CI / CD</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.ci).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Database & ORM</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.database).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Testing</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.testing).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Code Quality</h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(result.quality).map(([name, enabled]) => (
            <span
              key={name}
              className={`border px-3 py-1 ${
                enabled
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

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
