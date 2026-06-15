import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function createPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required for inspection");

  const parsed = new URL(url);
  return new PrismaClient({
    adapter: new PrismaMariaDb({
      host: parsed.hostname,
      port: parsed.port ? Number(parsed.port) : 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
      connectionLimit: 5,
      connectTimeout: 20000,
      acquireTimeout: 20000,
      socketTimeout: 20000,
      ssl: false,
    }),
  });
}

const prisma = createPrisma();

async function main() {
  try {
    const countProjects = await prisma.project.count();
    const countPublishedProjects = await prisma.project.count({ where: { published: true } });
    const countBlog = await prisma.blogPost.count();
    const countPublishedBlog = await prisma.blogPost.count({ where: { published: true } });
    const projects = await prisma.project.findMany({ take: 10, orderBy: { createdAt: "desc" } });
    const blog = await prisma.blogPost.findMany({ take: 10, orderBy: { createdAt: "desc" } });
    console.log(JSON.stringify({ countProjects, countPublishedProjects, countBlog, countPublishedBlog, projects, blog }, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
