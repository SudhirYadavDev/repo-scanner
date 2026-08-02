"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import RepositorySearch from "./RepositorySearch";
import ImportedRepositoryTable from "./ImportedRepositoryTable";

import { getRepositories } from "../actions/getRepositories";
import { ImportedRepository } from "../types/importedRepository";

const ITEMS_PER_PAGE = 10;

export default function RepositoryDashboard() {
  const [repositories, setRepositories] = useState<ImportedRepository[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) =>
      repository.fullName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [repositories, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRepositories.length / ITEMS_PER_PAGE),
  );

  const paginatedRepositories = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return filteredRepositories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRepositories, page]);

  return (
    <section className="mt-5 flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Imported Repositories
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          View and scan repositories already connected to Repo Scanner.
        </p>
      </div>

      {isLoading || isPending ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-zinc-200 text-zinc-500">
          Loading imported repositories...
        </div>
      ) : (
        <>
          <div className="mb-4 w-[72%]">
            <RepositorySearch value={search} onChange={handleSearch} />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <ImportedRepositoryTable repositories={paginatedRepositories} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              Showing {paginatedRepositories.length} of{" "}
              {filteredRepositories.length}
            </p>

            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-zinc-600">
                {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}