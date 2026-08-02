"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  FileSearch,
  History,
  FolderOpen,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Repositories",
    href: "/dashboard/repositories",
    icon: FolderGit2,
  },
  {
    title: "Imported",
    href: "/dashboard/imported",
    icon: FolderOpen,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileSearch,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
];

export default function CommandRail() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-10 top-1/2 z-40 -translate-y-1/2">
      <div className="w-20 rounded-3xl border border-zinc-200 bg-white p-3 shadow-xl">
        <nav className="space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 ${
                  active
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <Icon size={22} />

                <span className="pointer-events-none absolute left-20 rounded-xl bg-zinc-900 px-3 py-2 text-sm text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
