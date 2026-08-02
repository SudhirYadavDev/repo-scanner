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
    <div className="border border-gray-300 bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">Repository Metrics</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{card.title}</p>

            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
