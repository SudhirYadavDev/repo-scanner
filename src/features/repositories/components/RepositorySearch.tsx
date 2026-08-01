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
      className="mt-6 w-full border border-gray-300 bg-white px-3 py-2 outline-none"
    />
  );
}