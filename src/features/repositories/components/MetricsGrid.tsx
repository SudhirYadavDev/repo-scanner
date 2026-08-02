import { RepositoryScanResult } from "../scanner/scanResult";

interface MetricsGridProps {
  metrics: RepositoryScanResult["metrics"];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = [
    {
      title: "Source Files",
      value: metrics.sourceFiles,
    },
    {
      title: "React Components",
      value: metrics.reactComponents,
    },
    {
      title: "API Routes",
      value: metrics.apiRoutes,
    },
    {
      title: "Pages",
      value: metrics.pages,
    },
    {
      title: "Configuration Files",
      value: metrics.configFiles,
    },
    {
      title: "Documentation",
      value: metrics.documentationFiles,
    },
    {
      title: "Images",
      value: metrics.imageFiles,
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-zinc-900">
        Repository Metrics
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-5"
          >
            <p className="text-sm text-zinc-500">{card.title}</p>

            <p className="mt-3 text-3xl font-black text-zinc-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
