"use client";

import { useMemo, useState, useTransition } from "react";

import RepositorySearch from "./RepositorySearch";
import RepositoryTable from "./RepositoryTable";

import { syncRepositories } from "../actions/syncRepositories";
import { RepositoryListItem } from "../types/repository";

import { importRepositories } from "../actions/importRepositories";

export default function RepositorySelector() {
  const [repositories, setRepositories] = useState<RepositoryListItem[]>([]);
  const [isSyncing, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [isImporting, startImportTransition] = useTransition();

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) =>
      repository.fullName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [repositories, search]);

  const selectedCount = repositories.filter(
    (repository) => repository.selected,
  ).length;

  function handleSync() {
    startTransition(async () => {
      const repos = await syncRepositories();
      setRepositories(repos);
    });
  }

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
    const shouldSelectAll = filteredRepositories.some(
      (repository) => !repository.selected,
    );

    setRepositories((current) =>
      current.map((repository) =>
        filteredRepositories.some(
          (filtered) => filtered.githubId === repository.githubId,
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

      console.log(result);
    });
  }

  return (
    <div className="mt-10">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="border border-green-600 bg-green-600 px-5 py-3 text-white transition hover:bg-green-700 disabled:cursor-not-allowed"
      >
        {isSyncing ? "Syncing..." : "Sync GitHub Repositories"}
      </button>

      <RepositorySearch value={search} onChange={setSearch} />

      <RepositoryTable
        repositories={filteredRepositories}
        onToggle={toggleRepository}
        onToggleAll={toggleAllRepositories}
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">{selectedCount} selected</p>

        <button
          onClick={handleImport}
          disabled={selectedCount === 0 || isImporting}
          className="border border-green-600 bg-green-600 px-4 py-2 text-white disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-600"
        >
          {isImporting ? "Importing..." : "Import Selected"}
        </button>
      </div>
    </div>
  );
}
