import { rm } from "node:fs/promises";

export async function cleanup(directory: string) {
  await rm(directory, {
    recursive: true,
    force: true,
  });
}