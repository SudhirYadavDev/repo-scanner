"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import ImportedRepositoryTable from "./ImportedRepositoryTable";

import { getRepositories } from "../actions/getRepositories";
import { ImportedRepository } from "../types/importedRepository";

export default function RepositoryDashboard() {
  const [repositories, setRepositories] = useState<ImportedRepository[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadRepositories = useCallback(() => {
    startTransition(async () => {
      const data = await getRepositories();

      setRepositories(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    loadRepositories();
  }, [loadRepositories]);

  return (
    <div className="mt-8 space-y-12">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Imported Repositories
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            View and scan repositories already connected to Repo Scanner.
          </p>
        </div>

        {isLoading || isPending ? (
          <div className="rounded-2xl border border-zinc-200 p-10 text-center text-zinc-500">
            Loading imported repositories...
          </div>
        ) : (
          <ImportedRepositoryTable repositories={repositories} />
        )}
      </section>
    </div>
  );
}
