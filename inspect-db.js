require('dotenv/config');
const { PrismaClient } = require('./src/generated/prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const countProjects = await prisma.project.count();
    const countPublishedProjects = await prisma.project.count({ where: { published: true } });
    const countFeaturedProjects = await prisma.project.count({ where: { featured: true } });
    const countBlog = await prisma.blogPost.count();
    const countPublishedBlog = await prisma.blogPost.count({ where: { published: true } });
    const countFeaturedBlog = await prisma.blogPost.count({ where: { featured: true } });
    const projects = await prisma.project.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
    const blog = await prisma.blogPost.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
    console.log(JSON.stringify({ countProjects, countPublishedProjects, countFeaturedProjects, countBlog, countPublishedBlog, countFeaturedBlog, projects, blog }, null, 2));
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();