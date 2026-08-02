import React from "react";

import CommandRail from "@/components/layout/CommandRail";
import PageContainer from "@/components/layout/PageContainer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#f6f7fb]">
      <CommandRail />

      <div className="h-full pl-36">
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}