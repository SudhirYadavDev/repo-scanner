export function detectStructure(files: string[]) {
  const normalized = files.map((file) =>
    file.replaceAll("\\", "/").toLowerCase(),
  );

  const hasFolder = (folder: string) =>
    normalized.some((file) => file.includes(`/${folder}/`));

  return {
    src: hasFolder("src"),

    app: hasFolder("app"),

    pages: hasFolder("pages"),

    components: hasFolder("components"),

    hooks: hasFolder("hooks"),

    services: hasFolder("services"),

    lib: hasFolder("lib"),

    utils: hasFolder("utils"),

    middleware: hasFolder("middleware"),

    public: hasFolder("public"),

    assets: hasFolder("assets"),

    prisma: hasFolder("prisma"),

    tests: hasFolder("tests") || hasFolder("__tests__"),
  };
}
