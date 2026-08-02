interface BadgeSectionProps {
  title: string;
  items: Record<string, boolean>;
  color?: "green" | "blue" | "purple" | "orange";
}

const colors = {
  green: "border-green-200 bg-green-100 text-green-800",
  blue: "border-blue-200 bg-blue-100 text-blue-800",
  purple: "border-purple-200 bg-purple-100 text-purple-800",
  orange: "border-orange-200 bg-orange-100 text-orange-800",
};

export default function BadgeSection({
  title,
  items,
  color = "green",
}: BadgeSectionProps) {
  const enabledItems = Object.entries(items).filter(([, enabled]) => enabled);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">{title}</h2>

      {enabledItems.length === 0 ? (
        <p className="text-sm text-gray-500">Nothing detected.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {enabledItems.map(([name]) => (
            <span
              key={name}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                colors[color]
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
