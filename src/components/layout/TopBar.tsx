"use client";

import Image from "next/image";
import { useTransition } from "react";

import { useSession } from "@/lib/auth-client";

import { syncRepositories } from "@/features/repositories/actions/syncRepositories";
import { RepositoryListItem } from "@/features/repositories/types/repository";

interface TopBarProps {
  onSyncComplete: (
    repositories: RepositoryListItem[],
  ) => void;
}

export default function TopBar({
  onSyncComplete,
}: TopBarProps) {
  const { data } = useSession();

  const [isSyncing, startTransition] = useTransition();

  function handleSync() {
    startTransition(async () => {
      const repositories = await syncRepositories();

      onSyncComplete(repositories);
    });
  }

  return (
    <header className="pt-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-zinc-200 bg-white px-12 py-12 shadow-sm">
        <div className="flex items-center gap-10">
          {data?.user.image ? (
            <Image
              src={data.user.image}
              alt={data.user.name ?? "User"}
              width={150}
              height={150}
              className="rounded-full border-4 border-zinc-100 shadow-md"
            />
          ) : (
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-4 border-zinc-100 bg-zinc-100 text-5xl font-bold text-zinc-400">
              {data?.user.name?.charAt(0) ?? "U"}
            </div>
          )}

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
              {data?.user.name ?? "User"}
            </h1>

            <p className="mt-3 text-lg text-zinc-500">
              {data?.user.email}
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Repo Scanner
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
                Analyze, understand and monitor your GitHub repositories with
                detailed technical insights.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="rounded-2xl bg-zinc-900 px-8 py-5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSyncing ? "Syncing..." : "Sync Repositories"}
        </button>
      </div>
    </header>
  );
}