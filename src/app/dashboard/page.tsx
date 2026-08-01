"use client";

import Image from "next/image";

import { useSession } from "@/lib/auth-client";
import RepositorySelector from "@/features/repositories/components/RepositorySelector";

export default function DashboardPage() {
  const { data, isPending } = useSession();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl p-8">
        <div className="flex items-center gap-5">
          <Image
            src={data?.user.image ?? ""}
            alt={data?.user.name ?? "User"}
            width={72}
            height={72}
            className="rounded-full"
          />

          <div>
            <h1 className="text-3xl font-bold">Welcome, {data?.user.name}</h1>

            <p className="text-gray-600">{data?.user.email}</p>
          </div>
        </div>

        <RepositorySelector />
      </div>
    </main>
  );
}
