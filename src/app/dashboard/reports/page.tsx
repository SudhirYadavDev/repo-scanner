import RepositoryScanResult from "@/features/repositories/components/RepositoryScanResult";
import { getCachedRepositoryReport } from "@/features/repositories/actions/getCachedReport";

export default async function ReportsPage() {
  const cachedReport = await getCachedRepositoryReport();

  if (!cachedReport) {
    return (
      <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-12 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">
          No Report Available
        </h2>

        <p className="mt-3 text-zinc-500">
          Scan a repository from the Imported page to generate a report.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">{cachedReport.repositoryName}</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Last scanned {new Date(cachedReport.scannedAt).toLocaleString()}
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <RepositoryScanResult result={cachedReport.report} />
      </section>
    </div>
  );
}
