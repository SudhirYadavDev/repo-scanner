"use client";

interface ProfileStatsProps {
  stats: {
    totalRepositories: number;
    totalStars: number;
    publicRepositories: number;
    privateRepositories: number;
    totalContributions: number;
    currentYearContributions: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    {
      title: "Total Repositories",
      value: stats.totalRepositories,
    },
    {
      title: "Total Stars",
      value: stats.totalStars,
    },
    {
      title: "Public Repositories",
      value: stats.publicRepositories,
    },
    {
      title: "Private Repositories",
      value: stats.privateRepositories,
    },
    {
      title: "Total Contributions",
      value: stats.totalContributions,
    },
    {
      title: "Current Year Contributions",
      value: stats.currentYearContributions,
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-200 p-5"
          >
            <p className="text-sm text-zinc-500">
              {item.title}
            </p>

            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}