"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import RepositorySearch from "./RepositorySearch";
import RepositoryTable from "./RepositoryTable";

import { RepositoryListItem } from "../types/repository";
import { importRepositories } from "../actions/importRepositories";
import { syncRepositories } from "../actions/syncRepositories";

import { startOperation, finishOperation } from "@/lib/operationStatus";

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
        startOperation("sync");

        startImportTransition(async () => {
          try {
            const data = await syncRepositories();

            sessionStorage.setItem("githubRepositories", JSON.stringify(data));
            sessionStorage.setItem("lastRepoSync", new Date().toISOString());

            window.dispatchEvent(new Event("repo-sync"));

            setRepositories(data);
          } finally {
            setTimeout(() => {
              finishOperation();
            }, 800);
          }
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
    startOperation("import");

    startImportTransition(async () => {
      try {
        const result = await importRepositories(repositories);

        if (result.imported > 0) {
          onImportComplete();
        }
      } finally {
        setTimeout(() => {
          finishOperation();
        }, 800);
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
          className="group flex shrink-0 items-center gap-2 overflow-hidden rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2
            size={18}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <span>{isImporting ? "Importing..." : "Import Selected"}</span>

          {!isImporting && (
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <RepositoryTable
          repositories={paginatedRepositories}
          onToggle={toggleRepository}
          onToggleAll={toggleAllRepositories}
        />
      </div>

      <div className="mb-4 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          <CheckCircle2 size={16} />
          {selectedCount} selected
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((value) => value - 1)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((value) => value + 1)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}