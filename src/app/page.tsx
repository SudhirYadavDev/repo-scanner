"use client";

import { signIn } from "@/lib/auth-client";

export default function HomePage() {
  const handleGitHubLogin = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Repo Scanner
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Analyze your GitHub repositories
        </p>

        <button
          onClick={handleGitHubLogin}
          className="mt-8 w-full rounded-md bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Continue with GitHub
        </button>
      </div>
    </main>
  );
}