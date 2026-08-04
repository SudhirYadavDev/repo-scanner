"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RepositorySelector from "./RepositorySelector";

import { RepositoryListItem } from "../types/repository";

export default function RepositoryImportPage() {
  const [repositories, setRepositories] = useState<RepositoryListItem[]>([]);

  const searchParams = useSearchParams();
  const shouldSync = searchParams.get("sync") === "true";

  const router = useRouter();

  return (
    <section className="mt-5 flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Sync GitHub Repositories
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Select repositories you want to import into Repo Scanner.
        </p>
      </div>

      <div className="min-h-0 flex-1">
        <RepositorySelector
          shouldSync={shouldSync}
          repositories={repositories}
          setRepositories={setRepositories}
          onImportComplete={() => {
            router.push("/dashboard/imported");
          }}
        />
      </div>
    </section>
  );
}