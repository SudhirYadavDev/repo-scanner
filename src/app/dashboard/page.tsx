"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";

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
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Image
          src={data?.user.image ?? ""}
          alt={data?.user.name ?? "User"}
          width={96}
          height={96}
          className="mx-auto rounded-full"
        />

        <h1 className="mt-4 text-3xl font-bold">{data?.user.name}</h1>

        <p className="text-gray-600">{data?.user.email}</p>
      </div>
    </main>
  );
}
