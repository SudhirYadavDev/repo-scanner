interface RepositoryScoreCardProps {
  score: {
    overall: number;
    rating: "Excellent" | "Good" | "Average" | "Poor";
    passed: string[];
    missing: string[];
  };
}

export default function RepositoryScoreCard({
  score,
}: RepositoryScoreCardProps) {
  const badgeColor = {
    Excellent: "bg-emerald-500",
    Good: "bg-blue-500",
    Average: "bg-amber-500",
    Poor: "bg-red-500",
  }[score.rating];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Repository Health</h2>

          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Overall project quality based on detected technologies, tooling and
            repository structure.
          </p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-black text-zinc-900">{score.overall}</p>

          <p className="text-xs text-zinc-500">out of 100</p>

          <span
            className={`mt-3 inline-flex rounded-full px-4 py-1 text-xs font-semibold text-white ${badgeColor}`}
          >
            {score.rating}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${score.overall}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-emerald-700">
            Detected
          </h3>

          <div className="flex flex-wrap gap-2">
            {score.passed.length === 0 ? (
              <span className="text-sm text-zinc-400">Nothing detected</span>
            ) : (
              score.passed.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-red-600">
            Missing / Improve
          </h3>

          <div className="flex flex-wrap gap-2">
            {score.missing.length === 0 ? (
              <span className="text-sm text-zinc-400">
                No improvements required
              </span>
            ) : (
              score.missing.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
