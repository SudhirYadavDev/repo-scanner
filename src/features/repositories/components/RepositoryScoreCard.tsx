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
    Excellent:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    Good:
      "border-sky-200 bg-sky-50 text-sky-700",
    Average:
      "border-amber-200 bg-amber-50 text-amber-700",
    Poor:
      "border-red-200 bg-red-50 text-red-700",
  }[score.rating];

  const progressColor = {
    Excellent: "bg-emerald-500",
    Good: "bg-sky-500",
    Average: "bg-amber-500",
    Poor: "bg-red-500",
  }[score.rating];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Repository Analysis
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900">
            Repository Health
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
            Overall project quality calculated from project structure,
            technologies, tooling, best practices and repository
            configuration.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-6">
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            Overall Score
          </span>

          <h3 className="mt-2 text-6xl font-black text-zinc-900">
            {score.overall}
          </h3>

          <span className="text-sm text-zinc-500">
            out of 100
          </span>

          <span
            className={`mt-4 rounded-full border px-4 py-1.5 text-sm font-semibold ${badgeColor}`}
          >
            {score.rating}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-700">
            Health Score
          </span>

          <span className="text-sm font-semibold text-zinc-500">
            {score.overall}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
          <div
            className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
            style={{
              width: `${score.overall}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-emerald-700">
              ✓ Strengths
            </h3>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {score.passed.length}
            </span>
          </div>

          {score.passed.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nothing detected.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {score.passed.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-red-700">
              ⚠ Improvements
            </h3>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              {score.missing.length}
            </span>
          </div>

          {score.missing.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No improvements required.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {score.missing.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}