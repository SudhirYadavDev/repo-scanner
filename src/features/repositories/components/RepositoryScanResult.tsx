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
      <RepositoryScoreCard score={result.score} />

      <SecurityCard security={result.security} />

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-zinc-900">
            Scan Overview
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            General repository statistics detected during the scan.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">Files</p>

            <p className="mt-3 text-4xl font-black text-zinc-900">
              {result.totalFiles}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">Directories</p>

            <p className="mt-3 text-4xl font-black text-zinc-900">
              {result.totalDirectories}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">Lines of Code</p>

            <p className="mt-3 text-4xl font-black text-zinc-900">
              {result.totalLines}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Technology Detection
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Frameworks, databases and tooling identified in this repository.
          </p>
        </div>

        <div className="grid gap-6">
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

          <div className="grid gap-6 lg:grid-cols-2">
            <BadgeSection
              title="Package Manager"
              items={result.packageManager}
              color="blue"
            />

            <BadgeSection
              title="Docker"
              items={result.docker}
              color="blue"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Engineering Setup
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Development workflow and project quality configuration.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <BadgeSection
            title="CI / CD"
            items={result.ci}
            color="purple"
          />

          <BadgeSection
            title="Testing"
            items={result.testing}
            color="orange"
          />

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

          <div className="md:col-span-2">
            <BadgeSection
              title="Project Structure"
              items={result.structure}
              color="green"
            />
          </div>
        </div>
      </section>

      <MetricsGrid metrics={result.metrics} />

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">
              File Distribution
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Distribution of repository files grouped by extension.
            </p>
          </div>

          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700">
            {Object.keys(result.extensions).length} Types
          </span>
        </div>

        <div className="grid max-h-[420px] gap-4 overflow-y-auto pr-2 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(result.extensions)
            .sort(([, a], [, b]) => b - a)
            .map(([extension, count]) => {
              const percentage = Math.round(
                (count / result.totalFiles) * 100,
              );

              return (
                <div
                  key={extension}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300 hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-900">
                      {extension}
                    </span>

                    <span className="rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                      {count}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="h-full rounded-full bg-zinc-900"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-zinc-500">
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