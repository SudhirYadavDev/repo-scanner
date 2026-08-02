"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import RepositorySearch from "./RepositorySearch";
import RepositoryTable from "./RepositoryTable";

import { RepositoryListItem } from "../types/repository";
import { importRepositories } from "../actions/importRepositories";
import { syncRepositories } from "../actions/syncRepositories";

interface RepositorySelectorProps {
  shouldSync: boolean;
  repositories: RepositoryListItem[];
  setRepositories: React.Dispatch<React.SetStateAction<RepositoryListItem[]>>;
  onImportComplete: () => void;
}

const ITEMS_PER_PAGE = 10;

export default function RepositorySelector({
  shouldSync,
  repositories,
  setRepositories,
  onImportComplete,
}: RepositorySelectorProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isImporting, startImportTransition] = useTransition();

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) =>
      repository.fullName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [repositories, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRepositories.length / ITEMS_PER_PAGE),
  );

  const paginatedRepositories = filteredRepositories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const selectedCount = repositories.filter(
    (repository) => repository.selected,
  ).length;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  useEffect(() => {
    async function loadRepositories() {
      if (shouldSync) {
        startImportTransition(async () => {
          const data = await syncRepositories();

          sessionStorage.setItem("githubRepositories", JSON.stringify(data));

          sessionStorage.setItem("lastRepoSync", new Date().toISOString());

          window.dispatchEvent(new Event("repo-sync"));

          setRepositories(data);
        });

        return;
      }

      const cachedRepositories = sessionStorage.getItem("githubRepositories");

      if (cachedRepositories) {
        setRepositories(JSON.parse(cachedRepositories));
      }
    }

    loadRepositories();
  }, [shouldSync, setRepositories]);

  function toggleRepository(githubId: number) {
    setRepositories((current) =>
      current.map((repository) =>
        repository.githubId === githubId
          ? {
              ...repository,
              selected: !repository.selected,
            }
          : repository,
      ),
    );
  }

  function toggleAllRepositories() {
    const shouldSelectAll = paginatedRepositories.some(
      (repository) => !repository.selected,
    );

    setRepositories((current) =>
      current.map((repository) =>
        paginatedRepositories.some(
          (item) => item.githubId === repository.githubId,
        )
          ? {
              ...repository,
              selected: shouldSelectAll,
            }
          : repository,
      ),
    );
  }

  function handleImport() {
    startImportTransition(async () => {
      const result = await importRepositories(repositories);

      if (result.imported > 0) {
        onImportComplete();
      }
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <RepositorySearch value={search} onChange={handleSearchChange} />

        <button
          onClick={handleImport}
          disabled={selectedCount === 0 || isImporting}
          className="shrink-0 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isImporting ? "Importing..." : "Import Selected"}
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <RepositoryTable
          repositories={paginatedRepositories}
          onToggle={toggleRepository}
          onToggleAll={toggleAllRepositories}
        />
      </div>

      <div className="mt-2 mb-4 flex items-center justify-between">
        <p className="text-sm text-zinc-500">{selectedCount} selected</p>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((value) => value - 1)}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-zinc-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((value) => value + 1)}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
