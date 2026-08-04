import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";

import AdmZip from "adm-zip";

export async function downloadRepository(
  fullName: string,
  accessToken: string,
) {
  const response = await fetch(
    `https://api.github.com/repos/${fullName}/zipball`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to download repository archive.");
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const tempDirectory = join(tmpdir(), `repo-scanner-${randomUUID()}`);

  await mkdir(tempDirectory, {
    recursive: true,
  });

  const zipPath = join(tempDirectory, "repository.zip");

  await writeFile(zipPath, buffer);

  const zip = new AdmZip(zipPath);

  zip.extractAllTo(tempDirectory, true);

  const firstDirectory = zip
    .getEntries()
    .find((entry) => entry.entryName.includes("/"))
    ?.entryName.split("/")[0];

  if (!firstDirectory) {
    throw new Error("Unable to determine extracted repository directory.");
  }

  return join(tempDirectory, firstDirectory);
}
