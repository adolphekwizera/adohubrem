import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function resolveSsl(hostname: string): false | { rejectUnauthorized: false } {
  if (
    hostname.endsWith(".rlwy.net") ||
    hostname.endsWith(".railway.app")
  ) {
    return { rejectUnauthorized: false };
  }

  return false;
}

export function createMariaDbAdapterFromUrl(url: string) {
  if (!url.startsWith("mysql://") && !url.startsWith("mariadb://")) {
    throw new Error(
      "DATABASE_URL must start with mysql:// or mariadb://"
    );
  }

  const parsed = new URL(url);

  if (parsed.hostname.endsWith(".railway.internal")) {
    throw new Error(
      "DATABASE_URL uses Railway internal host (mysql.railway.internal). " +
        "For Vercel, set DATABASE_URL to Railway MYSQL_PUBLIC_URL instead."
    );
  }

  return new PrismaMariaDb({
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
    connectionLimit: 5,
    connectTimeout: 20000,
    acquireTimeout: 20000,
    socketTimeout: 20000,
    ssl: resolveSsl(parsed.hostname),
  });
}
