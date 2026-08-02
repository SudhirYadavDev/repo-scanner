interface RepositorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RepositorySearch({
  value,
  onChange,
}: RepositorySearchProps) {
  return (
    <input
      type="text"
      placeholder="Search repositories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-1/2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition"
    />
  );
}