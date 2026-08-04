import {
  Files,
  Component,
  Route,
  FileStack,
  Settings2,
  FileText,
  ImageIcon,
} from "lucide-react";

import { RepositoryScanResult } from "../scanner/scanResult";

interface MetricsGridProps {
  metrics: RepositoryScanResult["metrics"];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = [
    {
      title: "Source Files",
      value: metrics.sourceFiles,
      icon: Files,
      color: "text-sky-600 bg-sky-100",
    },
    {
      title: "React Components",
      value: metrics.reactComponents,
      icon: Component,
      color: "text-cyan-600 bg-cyan-100",
    },
    {
      title: "API Routes",
      value: metrics.apiRoutes,
      icon: Route,
      color: "text-violet-600 bg-violet-100",
    },
    {
      title: "Pages",
      value: metrics.pages,
      icon: FileStack,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      title: "Configuration Files",
      value: metrics.configFiles,
      icon: Settings2,
      color: "text-amber-600 bg-amber-100",
    },
    {
      title: "Documentation",
      value: metrics.documentationFiles,
      icon: FileText,
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Images",
      value: metrics.imageFiles,
      icon: ImageIcon,
      color: "text-pink-600 bg-pink-100",
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Repository Metrics
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Quick overview of the project structure.
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-600">
          {cards.length} Metrics
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.color}`}
                >
                  <Icon size={20} />
                </div>

                <p className="text-4xl font-black text-zinc-900">
                  {card.value}
                </p>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold text-zinc-900">
                  {card.title}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  Repository metric
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}