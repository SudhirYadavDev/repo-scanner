export function detectCI(files: string[]) {
  const normalized = files.map((file) =>
    file.replaceAll("\\", "/").toLowerCase(),
  );

  return {
    githubActions: normalized.some((file) =>
      file.includes(".github/workflows/"),
    ),

    gitlab: normalized.some((file) => file.endsWith(".gitlab-ci.yml")),

    jenkins: normalized.some((file) => file.endsWith("jenkinsfile")),

    circleCi: normalized.some((file) => file.includes(".circleci/config.yml")),

    azurePipelines: normalized.some((file) =>
      file.endsWith("azure-pipelines.yml"),
    ),

    travis: normalized.some((file) => file.endsWith(".travis.yml")),
  };
}
