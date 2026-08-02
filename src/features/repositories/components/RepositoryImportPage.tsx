"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import RepositorySelector from "./RepositorySelector";

import { RepositoryListItem } from "../types/repository";

export default function RepositoryImportPage() {
  const [repositories, setRepositories] = useState<RepositoryListItem[]>([]);

  const searchParams = useSearchParams();
  const shouldSync = searchParams.get("sync") === "true";
  const router = useRouter();

  return (
    <div className="mt-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Sync GitHub Repositories
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Select repositories you want to import into Repo Scanner.
          </p>
        </div>

        <RepositorySelector
          shouldSync={shouldSync}
          repositories={repositories}
          setRepositories={setRepositories}
          onImportComplete={() => {
            router.push("/dashboard/imported");
          }}
        />
      </section>
    </div>
  );
}
