"use client";

import { useState } from "react";

import { verifyOwnerPassword } from "./actions";

export default function OwnerPage() {
  const [password, setPassword] = useState("");
  const [visits, setVisits] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const result = await verifyOwnerPassword(password);

    if (!result.success) {
      setPassword("");
      setVisits(null);
      setError("Incorrect password.");
      return;
    }

    setVisits(result.visits);
  }

  if (visits !== null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-xl">
          <p className="text-sm uppercase tracking-widest text-zinc-400">
            Website Visits
          </p>

          <h1 className="mt-4 text-5xl font-black text-emerald-400">
            {visits}
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Owner Access
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        />

        {error && (
          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Unlock
        </button>
      </form>
    </main>
  );
}