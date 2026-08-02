interface SecurityIssue {
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  file: string;
  line: number;
  message: string;
}

interface SecurityCardProps {
  security: {
    score: number;
    issues: SecurityIssue[];
  };
}

export default function SecurityCard({ security }: SecurityCardProps) {
  const severityColor = (severity: SecurityIssue["severity"]) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";

      case "High":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const severityCount = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  security.issues.forEach((issue) => {
    severityCount[issue.severity]++;
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Security Analysis</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Static security inspection results.
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Security Score</p>

          <p className="text-4xl font-black text-emerald-600">
            {security.score}
            <span className="text-lg text-zinc-400">/100</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {Object.entries(severityCount).map(([severity, count]) => (
          <div
            key={severity}
            className="rounded-xl border border-zinc-200 p-3 text-center"
          >
            <p className="text-xs text-zinc-500">{severity}</p>

            <p className="mt-1 text-xl font-bold text-zinc-900">{count}</p>
          </div>
        ))}
      </div>

      {security.issues.length === 0 ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="font-semibold text-emerald-700">
            No security issues detected
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {security.issues.slice(0, 3).map((issue, index) => (
            <div key={index} className="rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${severityColor(
                    issue.severity,
                  )}`}
                >
                  {issue.severity}
                </span>

                <span className="text-xs text-zinc-500">Line {issue.line}</span>
              </div>

              <p className="mt-3 font-semibold text-zinc-900">{issue.type}</p>

              <p className="mt-1 text-xs text-zinc-500">{issue.file}</p>
            </div>
          ))}

          {security.issues.length > 3 && (
            <p className="text-sm text-zinc-500">
              + {security.issues.length - 3} more security issues
            </p>
          )}
        </div>
      )}
    </div>
  );
}
