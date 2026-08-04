import React from "react";

import CommandRail from "@/components/layout/CommandRail";
import PageContainer from "@/components/layout/PageContainer";
import OperationStatus from "@/components/common/OperationStatus";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#ecfff0]">
      <CommandRail />

      <div className="h-full pl-36">
        <PageContainer>
          <OperationStatus />

          {children}
        </PageContainer>
      </div>
    </div>
  );
}
