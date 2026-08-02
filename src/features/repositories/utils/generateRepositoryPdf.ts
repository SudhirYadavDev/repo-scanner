import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { RepositoryScanResult } from "../scanner/scanResult";

export async function generateRepositoryPdf(
  repositoryName: string,
  scannedAt: string,
  report: RepositoryScanResult,
) {
  const pdf = await PDFDocument.create();

  let page = pdf.addPage([595, 842]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const { height } = page.getSize();

  let y = height - 40;

  const newPage = () => {
    page = pdf.addPage([595, 842]);
    y = 800;
  };

  const write = (
    text: string,
    size = 12,
    boldText = false,
    color = rgb(0, 0, 0),
  ) => {
    if (y < 40) newPage();

    page.drawText(text, {
      x: 40,
      y,
      size,
      font: boldText ? bold : font,
      color,
    });

    y -= size + 8;
  };

  write("Repo Scanner", 24, true);
  write("Repository Analysis Report", 15);

  y -= 10;

  write(`Repository: ${repositoryName}`, 13, true);
  write(`Generated: ${new Date(scannedAt).toLocaleString()}`);

  y -= 15;

  write("Repository Health", 18, true);
  write(`Overall Score: ${report.score.overall}/100`);
  write(`Rating: ${report.score.rating}`);

  y -= 10;

  write("Security", 18, true);
  write(`Security Score: ${report.security.score}/100`);

  if (report.security.issues.length === 0) {
    write("No security issues detected.");
  } else {
    report.security.issues.forEach((issue) => {
      write(
        `${issue.severity} | ${issue.file}:${issue.line} | ${issue.message}`,
      );
    });
  }

  y -= 10;

  write("Repository Summary", 18, true);

  write(`Files: ${report.totalFiles}`);
  write(`Directories: ${report.totalDirectories}`);
  write(`Lines of Code: ${report.totalLines}`);

  y -= 10;

  write("Project Metrics", 18, true);

  Object.entries(report.metrics).forEach(([key, value]) => {
    write(`${key}: ${value}`);
  });

  const printBadges = (title: string, obj: Record<string, boolean>) => {
    y -= 10;

    write(title, 16, true);

    Object.entries(obj)
      .filter(([, enabled]) => enabled)
      .forEach(([name]) => write(`• ${name}`));
  };

  printBadges("Frameworks", report.frameworks);
  printBadges("Package Managers", report.packageManager);
  printBadges("Docker", report.docker);
  printBadges("CI/CD", report.ci);
  printBadges("Database", report.database);
  printBadges("Testing", report.testing);
  printBadges("Code Quality", report.quality);
  printBadges("Environment", report.environment);
  printBadges("Project Structure", report.structure);

  y -= 10;

  write("Detected File Extensions", 18, true);

  Object.entries(report.extensions).forEach(([ext, count]) => {
    write(`${ext}: ${count}`);
  });

  y -= 10;

  write("Detected Technologies", 18, true);

  report.score.passed.forEach((item) => {
    write(`- ${item}`);
  });

  y -= 10;

  write("Missing Technologies", 18, true);

  report.score.missing.forEach((item) => {
    write(`- ${item}`);
  });

  const bytes = await pdf.save();

  const blob = new Blob([new Uint8Array(bytes)], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = `${repositoryName.replace("/", "-")}-report.pdf`;

  a.click();

  URL.revokeObjectURL(url);
}
