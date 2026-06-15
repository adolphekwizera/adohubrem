"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedPostSection } from "@/components/sections/FeaturedPostSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SERVICES } from "@/lib/services-data";
import type { BlogPost, Project } from "@/generated/prisma/client";

interface HomePageProps {
  featuredProjects: Project[];
  latestPosts: BlogPost[];
  featuredPost: BlogPost | null;
}

const previewServices = SERVICES.flatMap((g) => [...g.items]).slice(0, 3);

export function HomePage({
  featuredProjects,
  latestPosts,
  featuredPost,
}: HomePageProps) {
  return (
    <>
      <HeroSection />
      <AboutSection />

      {featuredPost && <FeaturedPostSection post={featuredPost} />}

      {latestPosts.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeader
              eyebrow="Blog"
              title="Latest Posts"
              description="Tutorials, freelancing tips, and lessons from my tech journey."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/blog" variant="outline">
                Read All Posts
              </Button>
            </div>
          </Container>
        </section>
      )}

      {featuredProjects.length > 0 && (
        <section className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/30">
          <Container>
            <SectionHeader
              eyebrow="Portfolio"
              title="Featured Projects"
              description="Real projects I've built — from web applications to design work."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/projects" variant="outline">
                View All Projects
              </Button>
            </div>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="What I Can Do For You"
            description="Professional services for individuals and businesses."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services">View All Services</Button>
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
