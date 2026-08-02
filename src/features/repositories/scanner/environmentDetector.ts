import { basename } from "node:path";

export function detectEnvironment(files: string[]) {
  const names = files.map((file) => basename(file).toLowerCase());

  return {
    env: names.includes(".env"),

    envLocal: names.includes(".env.local"),

    envExample:
      names.includes(".env.example") ||
      names.includes(".env.sample"),

    envDevelopment:
      names.includes(".env.development"),

    envProduction:
      names.includes(".env.production"),
  };
}