"use client";

import { useEffect, useState } from "react";

import TopBar from "@/components/layout/TopBar";
import ProfileStats from "./ProfileStats";

import { getGithubStats } from "../actions/getGithubStats";

export default function DashboardClient() {
  const [stats, setStats] = useState({
    totalRepositories: 0,
    totalStars: 0,
    publicRepositories: 0,
    privateRepositories: 0,
    totalContributions: 0,
    currentYearContributions: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getGithubStats();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-6 py-6">
      <TopBar />

      <ProfileStats stats={stats} />
    </div>
  );
}