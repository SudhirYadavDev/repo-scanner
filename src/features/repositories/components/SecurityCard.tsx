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
        return "bg-red-600 text-white";

      case "High":
        return "bg-orange-500 text-white";

      case "Medium":
        return "bg-yellow-400 text-black";

      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Security Analysis</h2>

          <p className="text-sm text-zinc-500">Static security inspection</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-zinc-500">Security Score</p>

          <p className="text-4xl font-bold text-emerald-600">
            {security.score}/100
          </p>
        </div>
      </div>

      {security.issues.length === 0 ? (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5 text-center">
          <p className="text-lg font-semibold text-emerald-700">
            ✔ No security issues detected
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {security.issues.map((issue, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${severityColor(
                    issue.severity,
                  )}`}
                >
                  {issue.severity}
                </span>

                <span className="text-sm text-zinc-500">Line {issue.line}</span>
              </div>

              <p className="font-semibold">{issue.type}</p>

              <p className="mt-1 text-sm text-zinc-500">{issue.file}</p>

              <p className="mt-3 text-sm">{issue.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
