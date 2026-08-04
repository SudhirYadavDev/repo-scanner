"use client";

import Image from "next/image";

import { signIn } from "@/lib/auth-client";

interface LandingPageProps {
  visits: number;
  showCounter: boolean;
}

export default function LandingPage({ visits, showCounter }: LandingPageProps) {
  const handleGitHubLogin = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="flex items-center justify-between px-8 py-6 lg:px-16">
        <h1 className="text-xl font-bold tracking-tight">
          Repo<span className="text-emerald-500">Scanner</span>
        </h1>
        {showCounter && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
            <p className="text-xs uppercase tracking-wider text-emerald-400">
              Visits
            </p>

            <p className="text-xl font-bold">{visits}</p>
          </div>
        )}

        <button
          onClick={handleGitHubLogin}
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
        >
          Continue with GitHub
        </button>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-16 lg:grid-cols-2 lg:px-16 lg:py-24">
        <div>
          <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
            GitHub Repository Intelligence
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight lg:text-6xl">
            Understand your
            <span className="text-emerald-500"> GitHub repositories</span>{" "}
            instantly.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Repo Scanner analyzes your repositories, detects technologies,
            checks security risks, and generates detailed engineering reports.
          </p>

          <button
            onClick={handleGitHubLogin}
            className="mt-8 rounded-xl bg-emerald-500 px-7 py-3.5 font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            Start Scanning with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <Image
              src="/screenshots/dashboard.webp"
              alt="Repo Scanner dashboard"
              width={1200}
              height={800}
              className="w-full"
            />
          </div>

          <div className="absolute -bottom-8 -left-8 hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 lg:block group">
            <p className="text-sm text-zinc-400">Repository Analysis</p>

            <p className="mt-1 text-2xl font-bold text-emerald-400">
              Automated
            </p>

            <div className="pointer-events-none absolute left-0 top-full mt-3 w-72 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100">
              <p className="text-sm leading-relaxed text-zinc-400">
                <b className="text-emerald-400">Lestro:</b> I decided to build
                this application simply because one of my human friends was
                making one, and I wanted my own version.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-16 lg:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Repository Scanning",
              description:
                "Analyze project structure, files, frameworks, and dependencies.",
            },
            {
              title: "Security Analysis",
              description:
                "Detect possible security problems inside your codebase.",
            },
            {
              title: "Engineering Reports",
              description:
                "Generate clean reports with health scores and insights.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-16 lg:px-16">
        <h2 className="text-center text-3xl font-bold">
          See Repo Scanner in action
        </h2>

        <p className="mt-3 text-center text-zinc-400">
          From repository selection to complete engineering reports.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[
            {
              image: "/screenshots/repository.webp",
              title: "Repository Selection",
            },
            {
              image: "/screenshots/imported.webp",
              title: "Imported Repositories",
            },
            {
              image: "/screenshots/report.webp",
              title: "Detailed Scan Reports",
            },
            {
              image: "/screenshots/dashboard.webp",
              title: "Analytics Dashboard",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                className="w-full transition duration-500 hover:scale-105"
              />

              <div className="p-5">
                <h3 className="font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-8 py-20 text-center">
        <h2 className="text-4xl font-black">
          Ready to analyze your repositories?
        </h2>

        <p className="mt-4 text-zinc-400">
          Connect GitHub and get your first repository report.
        </p>

        <button
          onClick={handleGitHubLogin}
          className="mt-8 rounded-xl bg-emerald-500 px-8 py-3.5 font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Continue with GitHub
        </button>
      </section>

      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
        Repo Scanner © 2026
      </footer>
    </main>
  );
}
