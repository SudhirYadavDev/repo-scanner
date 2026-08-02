export function detectDatabase(dependencies: Record<string, string>) {
  return {
    postgres:
      "@prisma/client" in dependencies ||
      "pg" in dependencies ||
      "postgres" in dependencies,

    mysql: "mysql" in dependencies || "mysql2" in dependencies,

    mariadb: "mariadb" in dependencies,

    mongodb: "mongodb" in dependencies,

    sqlite: "sqlite3" in dependencies || "better-sqlite3" in dependencies,

    redis: "redis" in dependencies || "ioredis" in dependencies,

    prisma: "@prisma/client" in dependencies || "prisma" in dependencies,

    drizzle: "drizzle-orm" in dependencies,

    mongoose: "mongoose" in dependencies,
  };
}
