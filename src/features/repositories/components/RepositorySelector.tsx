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

export default function RepositorySelector({
  shouldSync,
  repositories,
  setRepositories,
  onImportComplete,
}: RepositorySelectorProps) {
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
      await importRepositories(repositories);

      onImportComplete();
    });
  }

  return (
    <div className="mt-10 space-y-6">
      <RepositorySearch value={search} onChange={setSearch} />

      <RepositoryTable
        repositories={filteredRepositories}
        onToggle={toggleRepository}
        onToggleAll={toggleAllRepositories}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{selectedCount} selected</p>

        <button
          onClick={handleImport}
          disabled={selectedCount === 0 || isImporting}
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isImporting ? "Importing..." : "Import Selected"}
        </button>
      </div>
    </div>
  );
}
