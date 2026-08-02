interface BadgeSectionProps {
  title: string;
  items: Record<string, boolean>;
  color?: "green" | "blue" | "purple" | "orange";
}

const colors = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  purple: "border-purple-200 bg-purple-50 text-purple-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
};

export default function BadgeSection({
  title,
  items,
  color = "green",
}: BadgeSectionProps) {
  const enabledItems = Object.entries(items).filter(([, enabled]) => enabled);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h2>

      {enabledItems.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing detected.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {enabledItems.map(([name]) => (
            <span
              key={name}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${colors[color]}`}
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
