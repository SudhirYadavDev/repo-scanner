"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "@/lib/auth-client";

export default function TopBar() {
  const { data } = useSession();

  const router = useRouter();

  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    const updateSyncTime = () => {
      setLastSync(sessionStorage.getItem("lastRepoSync"));
    };

    updateSyncTime();

    window.addEventListener("repo-sync", updateSyncTime);

    return () => {
      window.removeEventListener("repo-sync", updateSyncTime);
    };
  }, []);

  const hasSynced = !!lastSync;

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-zinc-200 bg-white px-12 py-8 shadow-sm">
        <div className="flex items-start gap-10">
          <div className="flex flex-col items-center">
            {data?.user.image ? (
              <Image
                src={data.user.image}
                alt={data.user.name ?? "User"}
                width={150}
                height={150}
                className="rounded-full border-4 border-zinc-100 shadow-md"
              />
            ) : (
              <div className="flex h-37.5 w-37.5 items-center justify-center rounded-full border-4 border-zinc-100 bg-zinc-100 text-5xl font-bold text-zinc-400">
                {data?.user.name?.charAt(0) ?? "U"}
              </div>
            )}

            <button
              onClick={async () => {
                sessionStorage.clear();

                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                    },
                  },
                });
              }}
              className="mt-6 w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              Logout
            </button>
          </div>

          <div className="pt-1">
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
              {data?.user.name ?? "User"}
            </h1>

            <p className="mt-3 text-lg text-zinc-500">{data?.user.email}</p>

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

        <div className="flex flex-col items-end gap-4">
          <button
            onClick={() => {
              sessionStorage.setItem("allowRepoSync", "true");
              router.push("/dashboard/repositories?sync=true");
            }}
            className="rounded-2xl bg-zinc-900 px-8 py-5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Sync Repositories
          </button>

          <p
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              hasSynced
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-zinc-100 text-zinc-500 border border-zinc-200"
            }`}
          >
            {hasSynced
              ? `✓ Last synced: ${new Date(lastSync).toLocaleString()}`
              : "Not synced yet"}
          </p>
        </div>
      </div>
    </header>
  );
}
