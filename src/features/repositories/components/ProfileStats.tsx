"use client";

import {
  FolderGit2,
  Star,
  Globe,
  Lock,
  GitCommitHorizontal,
  CalendarDays,
} from "lucide-react";

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
      icon: FolderGit2,
      color: "text-sky-600",
      hoverBg: "group-hover:bg-sky-600",
      glow: "bg-sky-300/30",
    },
    {
      title: "Total Stars",
      value: stats.totalStars,
      icon: Star,
      color: "text-amber-500",
      hoverBg: "group-hover:bg-amber-500",
      glow: "bg-amber-300/30",
    },
    {
      title: "Public Repositories",
      value: stats.publicRepositories,
      icon: Globe,
      color: "text-emerald-600",
      hoverBg: "group-hover:bg-emerald-600",
      glow: "bg-emerald-300/30",
    },
    {
      title: "Private Repositories",
      value: stats.privateRepositories,
      icon: Lock,
      color: "text-violet-600",
      hoverBg: "group-hover:bg-violet-600",
      glow: "bg-violet-300/30",
    },
    {
      title: "Total Contributions",
      value: stats.totalContributions,
      icon: GitCommitHorizontal,
      color: "text-rose-600",
      hoverBg: "group-hover:bg-rose-600",
      glow: "bg-rose-300/30",
    },
    {
      title: "Current Year Contributions",
      value: stats.currentYearContributions,
      icon: CalendarDays,
      color: "text-cyan-600",
      hoverBg: "group-hover:bg-cyan-600",
      glow: "bg-cyan-300/30",
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-lg"
            >
              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${item.glow}`}
              />

              <div className="relative flex items-center justify-between">
                <p className="text-sm text-zinc-500 transition-colors group-hover:text-zinc-700">
                  {item.title}
                </p>

                <div
                  className={`rounded-xl bg-zinc-100 p-2 transition-all duration-300 ${item.hoverBg}`}
                >
                  <Icon
                    size={20}
                    className={`${item.color} transition-colors duration-300 group-hover:text-white`}
                  />
                </div>
              </div>

              <p className="relative mt-5 text-3xl font-bold text-zinc-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
