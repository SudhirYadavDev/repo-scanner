"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import RepositorySelector from "./RepositorySelector";
import ImportedRepositoryTable from "./ImportedRepositoryTable";
import RepositoryScanResult from "./RepositoryScanResult";

import { getRepositories } from "../actions/getRepositories";
import { ImportedRepository } from "../types/importedRepository";
import { RepositoryListItem } from "../types/repository";
import { RepositoryScanResult as ScanResult } from "../scanner/scanResult";

interface RepositoryDashboardProps {
  githubRepositories: RepositoryListItem[];
  setGithubRepositories: React.Dispatch<
    React.SetStateAction<RepositoryListItem[]>
  >;
}

export default function RepositoryDashboard({
  githubRepositories,
  setGithubRepositories,
}: RepositoryDashboardProps) {
  const [repositories, setRepositories] = useState<ImportedRepository[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

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
    <div className="mt-14 space-y-12">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Repository Import
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Sync your GitHub repositories and choose which projects to analyze.
          </p>
        </div>

        <RepositorySelector
          repositories={githubRepositories}
          setRepositories={setGithubRepositories}
          onImportComplete={loadRepositories}
        />
      </section>

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
          <ImportedRepositoryTable
            repositories={repositories}
            onScanComplete={setScanResult}
          />
        )}
      </section>

      {scanResult && (
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Repository Analysis
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Technical breakdown, score and repository insights.
            </p>
          </div>

          <RepositoryScanResult result={scanResult} />
        </section>
      )}
    </div>
  );
}
