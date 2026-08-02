import { basename } from "node:path";

export function detectDocker(files: string[]) {
  const fileNames = files.map((file) => basename(file).toLowerCase());

  return {
    dockerfile: fileNames.includes("dockerfile"),

    compose:
      fileNames.includes("docker-compose.yml") ||
      fileNames.includes("docker-compose.yaml") ||
      fileNames.includes("compose.yml") ||
      fileNames.includes("compose.yaml"),
  };
}