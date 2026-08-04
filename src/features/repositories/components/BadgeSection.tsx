import {
  CheckCircle2,
  Layers3,
  Database,
  Package,
  Boxes,
  GitBranch,
  FlaskConical,
  ShieldCheck,
  FileCog,
} from "lucide-react";

interface BadgeSectionProps {
  title: string;
  items: Record<string, boolean>;
  color?: "green" | "blue" | "purple" | "orange";
}

const colors = {
  green: {
    card: "border-emerald-200 bg-emerald-50",
    badge: "border-emerald-200 bg-white text-emerald-700",
    icon: "text-emerald-600",
  },
  blue: {
    card: "border-sky-200 bg-sky-50",
    badge: "border-sky-200 bg-white text-sky-700",
    icon: "text-sky-600",
  },
  purple: {
    card: "border-violet-200 bg-violet-50",
    badge: "border-violet-200 bg-white text-violet-700",
    icon: "text-violet-600",
  },
  orange: {
    card: "border-amber-200 bg-amber-50",
    badge: "border-amber-200 bg-white text-amber-700",
    icon: "text-amber-600",
  },
};

export default function BadgeSection({
  title,
  items,
  color = "green",
}: BadgeSectionProps) {
  const enabledItems = Object.entries(items).filter(([, enabled]) => enabled);

  const Icon = (() => {
    switch (title) {
      case "Detected Frameworks":
        return Layers3;

      case "Database & ORM":
        return Database;

      case "Package Manager":
        return Package;

      case "Docker":
        return Boxes;

      case "CI / CD":
        return GitBranch;

      case "Testing":
        return FlaskConical;

      case "Code Quality":
        return ShieldCheck;

      case "Environment Files":
        return FileCog;

      default:
        return CheckCircle2;
    }
  })();

  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${colors[color].card}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Icon size={20} className={colors[color].icon} />
          </div>

          <div>
            <h2 className="font-bold text-zinc-900">{title}</h2>

            <p className="text-xs text-zinc-500">
              {enabledItems.length} detected
            </p>
          </div>
        </div>
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      {enabledItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-center">
          <p className="text-sm text-zinc-500">
            Nothing detected
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {enabledItems.map(([name]) => (
            <span
              key={name}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${colors[color].badge}`}
            >
              <CheckCircle2 size={13} />
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}