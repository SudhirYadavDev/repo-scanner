export function detectFrameworks(
  dependencies: Record<string, string>
) {
  return {
    next: "next" in dependencies,
    react: "react" in dependencies,
    prisma: "@prisma/client" in dependencies,
    tailwind: "tailwindcss" in dependencies,
    express: "express" in dependencies,
    nest: "@nestjs/core" in dependencies,
    vue: "vue" in dependencies,
    angular: "@angular/core" in dependencies,
  };
}