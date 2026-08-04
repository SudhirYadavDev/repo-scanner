import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Bug,
  CircleDot,
} from "lucide-react";

import { SecurityIssue, SecurityScanResult } from "../scanner/security/types";

interface SecurityCardProps {
  security: SecurityScanResult;
}

export default function SecurityCard({ security }: SecurityCardProps) {
  const severityColor = (severity: SecurityIssue["severity"]) => {
    switch (severity) {
      case "Critical":
        return "border-red-200 bg-red-50 text-red-700";

      case "High":
        return "border-orange-200 bg-orange-50 text-orange-700";

      case "Medium":
        return "border-amber-200 bg-amber-50 text-amber-700";

      default:
        return "border-sky-200 bg-sky-50 text-sky-700";
    }
  };

  const severityCount: Record<SecurityIssue["severity"], number> = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  security.issues.forEach((issue) => {
    severityCount[issue.severity]++;
  });

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Security Inspection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900">
            Security Analysis
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-500">
            Static inspection of repository files for exposed secrets,
            insecure practices and potentially vulnerable patterns.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-6">
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            Security Score
          </span>

          <h3 className="mt-2 text-6xl font-black text-emerald-600">
            {security.score}
          </h3>

          <span className="text-sm text-zinc-500">
            out of 100
          </span>

          {security.score >= 90 ? (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              <ShieldCheck size={16} />
              Secure
            </span>
          ) : (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">
              <ShieldAlert size={16} />
              Attention Needed
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(severityCount).map(([severity, count]) => (
          <div
            key={severity}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {severity}
            </p>

            <p className="mt-2 text-3xl font-black text-zinc-900">
              {count}
            </p>
          </div>
        ))}
      </div>

      {security.issues.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <ShieldCheck
            size={42}
            className="mx-auto mb-4 text-emerald-600"
          />

          <h3 className="text-lg font-bold text-emerald-700">
            No Security Issues Detected
          </h3>

          <p className="mt-2 text-sm text-emerald-600">
            Repository passed the current security inspection.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900">
              Top Security Findings
            </h3>

            <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {security.issues.length} Issues
            </span>
          </div>

          <div className="space-y-4">
            {security.issues.slice(0, 3).map((issue, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-200 p-5 transition hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${severityColor(
                      issue.severity,
                    )}`}
                  >
                    {issue.severity}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                    <CircleDot size={14} />
                    Line {issue.line}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <Bug
                    size={20}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <div className="min-w-0">
                    <h4 className="font-semibold text-zinc-900">
                      {issue.type}
                    </h4>

                    <p className="mt-1 break-all text-sm text-zinc-500">
                      {issue.file}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {security.issues.length > 3 && (
            <div className="mt-5 flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-4">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600">
                <AlertTriangle size={16} />
                + {security.issues.length - 3} additional security findings
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}