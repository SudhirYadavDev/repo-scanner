import { RepositoryScanResult as ScanResult } from "../scanner/scanResult";

import BadgeSection from "./BadgeSection";
import MetricsGrid from "./MetricsGrid";
import RepositoryScoreCard from "./RepositoryScoreCard";
import SecurityCard from "./SecurityCard";

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
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <RepositoryScoreCard score={result.score} />

        <SecurityCard security={result.security} />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900">
          Scan Overview
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">Files</p>

            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {result.totalFiles}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">Directories</p>

            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {result.totalDirectories}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">Lines of Code</p>

            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {result.totalLines}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold text-zinc-900">
          Technology Detection
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <BadgeSection
            title="Detected Frameworks"
            items={result.frameworks}
            color="green"
          />

          <BadgeSection
            title="Database & ORM"
            items={result.database}
            color="green"
          />

          <BadgeSection
            title="Package Manager"
            items={result.packageManager}
            color="blue"
          />

          <BadgeSection title="Docker" items={result.docker} color="blue" />
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold text-zinc-900">
          Engineering Setup
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <BadgeSection title="CI / CD" items={result.ci} color="purple" />

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
        </div>
      </section>

      <MetricsGrid metrics={result.metrics} />

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              File Distribution
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Breakdown of files by extension.
            </p>
          </div>

          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
            {Object.keys(result.extensions).length} Types
          </span>
        </div>

        <div className="grid max-h-[420px] gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(result.extensions)
            .sort(([, a], [, b]) => b - a)
            .map(([extension, count]) => {
              const percentage = Math.round((count / result.totalFiles) * 100);

              return (
                <div
                  key={extension}
                  className="rounded-xl border border-zinc-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-800">
                      {extension}
                    </span>

                    <span className="text-sm font-medium text-zinc-500">
                      {count}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-zinc-500">
                    {percentage}% of repository files
                  </p>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
