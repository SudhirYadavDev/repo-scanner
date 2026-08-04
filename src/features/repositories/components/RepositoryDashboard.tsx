"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { FolderGit2, Search, ChevronLeft, ChevronRight } from "lucide-react";

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

  if (isLoading || isPending) {
    return (
      <div className="mt-5 rounded-3xl border border-zinc-200 bg-white p-16 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-zinc-100">
          <FolderGit2 className="text-zinc-500" size={30} />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-zinc-900">
          Loading Repositories
        </h2>

        <p className="mt-2 text-zinc-500">
          Fetching your imported repositories...
        </p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="mt-5 rounded-3xl border border-zinc-200 bg-white p-16 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100">
          <FolderGit2 className="text-zinc-500" size={38} />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-zinc-900">
          No Imported Repositories
        </h2>

        <p className="mx-auto mt-3 max-w-md leading-relaxed text-zinc-500">
          Import repositories from the Repositories page to begin scanning and
          generating reports.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-5 flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900">
            Imported Repositories
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            View and scan repositories already connected to Repo Scanner.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2">
          <FolderGit2 size={18} className="text-sky-600" />

          <span className="text-sm font-medium text-zinc-700">
            {filteredRepositories.length} Repository
            {filteredRepositories.length !== 1 && "ies"}
          </span>
        </div>
      </div>

      <div className="mb-5 w-[72%]">
        <RepositorySearch value={search} onChange={handleSearch} />
      </div>

      {filteredRepositories.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Search className="text-zinc-400" size={28} />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-zinc-900">
            No Matching Repositories
          </h3>

          <p className="mt-2 text-zinc-500">
            Try searching with a different repository name.
          </p>
        </div>
      ) : (
        <>
          <div className="min-h-0 flex-1 overflow-hidden">
            <ImportedRepositoryTable repositories={paginatedRepositories} />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              Showing{" "}
              <span className="font-semibold text-zinc-700">
                {paginatedRepositories.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-zinc-700">
                {filteredRepositories.length}
              </span>{" "}
              repositories
            </p>

            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700">
                {page} / {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
