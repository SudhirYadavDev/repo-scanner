"use client";

import { useState } from "react";

import TopBar from "@/components/layout/TopBar";

import RepositoryDashboard from "./RepositoryDashboard";

import { RepositoryListItem } from "../types/repository";

export default function DashboardClient() {
  const [githubRepositories, setGithubRepositories] = useState<
    RepositoryListItem[]
  >([]);

  return (
    <>
      <TopBar onSyncComplete={setGithubRepositories} />

      <RepositoryDashboard
        githubRepositories={githubRepositories}
        setGithubRepositories={setGithubRepositories}
      />
    </>
  );
}