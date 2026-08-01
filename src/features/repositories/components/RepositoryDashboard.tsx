"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import RepositorySelector from "./RepositorySelector";
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
    <div>
      <RepositorySelector onImportComplete={loadRepositories} />

      {isLoading || isPending ? (
        <div className="mt-10 border border-gray-300 bg-white p-8 text-center text-gray-500">
          Loading imported repositories...
        </div>
      ) : (
        <ImportedRepositoryTable repositories={repositories} />
      )}
    </div>
  );
}
