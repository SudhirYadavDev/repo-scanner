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
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">
            Repository Health
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Overall project quality based on detected technologies, tooling and
            repository structure.
          </p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-black text-zinc-900">{score.overall}</p>

          <p className="text-sm text-zinc-500">out of 100</p>

          <span
            className={`mt-3 inline-flex rounded-full px-4 py-1 text-sm font-semibold text-white ${badgeColor}`}
          >
            {score.rating}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${score.overall}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold text-emerald-700">✓ Detected</h3>

          <div className="flex flex-wrap gap-2">
            {score.passed.map((item) => (
              <span
                key={item}
                className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-red-600">
            Missing / Could Improve
          </h3>

          <div className="flex flex-wrap gap-2">
            {score.missing.map((item) => (
              <span
                key={item}
                className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
