"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { RefreshCw, CheckCircle2, Clock3 } from "lucide-react";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-zinc-200 bg-white px-12 py-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="flex items-start gap-10">
          <div className="flex flex-col items-center">
            <div className="group relative">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-sky-400/25 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

              {data?.user.image ? (
                <Image
                  src={data.user.image}
                  alt={data.user.name ?? "User"}
                  width={150}
                  height={150}
                  className="relative rounded-full border-4 border-zinc-100 shadow-md transition duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="relative flex h-37.5 w-37.5 items-center justify-center rounded-full border-4 border-zinc-100 bg-zinc-100 text-5xl font-bold text-zinc-400 transition duration-300 group-hover:scale-[1.03]">
                  {data?.user.name?.charAt(0) ?? "U"}
                </div>
              )}
            </div>

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
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-600 hover:text-white hover:shadow-lg"
            >
              Logout
            </button>
          </div>

          <div className="pt-1">
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

        <div className="flex flex-col items-end gap-5">
          <button
            onClick={() => {
              sessionStorage.setItem("allowRepoSync", "true");
              router.push("/dashboard/repositories?sync=true");
            }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 px-8 py-5 text-sm font-semibold text-white shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2">
              <RefreshCw
                size={18}
                className="transition-transform duration-500 group-hover:rotate-180"
              />
              Sync Repositories
            </span>
          </button>

          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              hasSynced
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-zinc-200 bg-zinc-100 text-zinc-500"
            }`}
          >
            {hasSynced ? (
              <>
                <CheckCircle2 size={18} className="text-emerald-600" />

                <div className="flex flex-col">
                  <span>Repositories Synced</span>

                  <span className="text-xs text-emerald-600">
                    {new Date(lastSync).toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Clock3 size={18} />

                <span>Not synced yet</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}