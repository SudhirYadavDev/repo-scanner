"use client";

import { Search } from "lucide-react";

interface RepositorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RepositorySearch({
  value,
  onChange,
}: RepositorySearchProps) {
  return (
    <div className="group relative w-1/2">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-all duration-300 group-focus-within:text-zinc-900 group-focus-within:scale-110"
      />

      <input
        type="text"
        placeholder="Search repositories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-700 shadow-sm outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-zinc-300 hover:shadow-md focus:border-zinc-900 focus:shadow-lg"
      />

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-all duration-300 group-focus-within:ring-1 group-focus-within:ring-zinc-900/10" />
    </div>
  );
}