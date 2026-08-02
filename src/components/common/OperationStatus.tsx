"use client";

import { useEffect, useState } from "react";

import { Loader2, Download, FolderSync, SearchCheck } from "lucide-react";

import { getOperation, OperationType } from "@/lib/operationStatus";

export default function OperationStatus() {
  const [operation, setOperation] = useState<OperationType>(null);

  useEffect(() => {
    function update() {
      setOperation(getOperation());
    }

    update();

    window.addEventListener("operation-status-changed", update);

    return () => window.removeEventListener("operation-status-changed", update);
  }, []);

  if (!operation) {
    return null;
  }

  const config = {
    sync: {
      icon: FolderSync,
      title: "Syncing GitHub Repositories",
      description: "Fetching repositories from GitHub...",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      progress: "bg-blue-500",
    },

    import: {
      icon: Download,
      title: "Importing Repositories",
      description: "Saving selected repositories...",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
      progress: "bg-violet-500",
    },

    scan: {
      icon: SearchCheck,
      title: "Scanning Repository",
      description:
        "Analyzing frameworks, security, metrics and project structure...",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      progress: "bg-emerald-500",
    },
  }[operation];

  const Icon = config.icon;

  return (
    <div
      className={`mb-5 rounded-2xl border ${config.border} ${config.bg} p-5 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white ${config.color}`}
        >
          <Icon size={24} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Loader2 size={18} className={`${config.color} animate-spin`} />

            <h3 className={`font-semibold ${config.color}`}>{config.title}</h3>
          </div>

          <p className="mt-1 text-sm text-zinc-600">{config.description}</p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div
              className={`h-full w-1/3 rounded-full ${config.progress} animate-[loading_1.2s_ease-in-out_infinite]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
