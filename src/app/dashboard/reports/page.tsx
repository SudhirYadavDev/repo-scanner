import RepositoryScanResult from "@/features/repositories/components/RepositoryScanResult";
import DownloadReportButton from "@/features/repositories/components/DownloadReportButton";

import { getCachedRepositoryReport } from "@/features/repositories/actions/getCachedReport";

export default async function ReportsPage() {
  const cachedReport = await getCachedRepositoryReport();

  if (!cachedReport) {
    return (
      <div className="h-full overflow-y-auto pb-8 mt-5">
        <div className="rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-900">
            No Report Available
          </h2>

          <p className="mt-3 text-zinc-500">
            Scan a repository from the Imported page to generate a report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-8 pr-2">
      <div className="space-y-8">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black text-zinc-900">
                {cachedReport.repositoryName}
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Last scanned {new Date(cachedReport.scannedAt).toLocaleString()}
              </p>
            </div>

            <DownloadReportButton
              repositoryName={cachedReport.repositoryName}
              scannedAt={cachedReport.scannedAt}
              report={cachedReport.report}
            />
          </div>
        </section>

        <RepositoryScanResult result={cachedReport.report} />
      </div>
    </div>
  );
}
