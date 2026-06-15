import type { Metadata } from "next";
import Image from "next/image";
import { Download, GraduationCap, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SKILLS } from "@/lib/services-data";
import { IMAGES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE.name} — Computer Science student, full-stack developer, IT specialist, and graphic designer.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow="About Me"
        title={SITE.name}
        description={SITE.description}
      />

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="text-emerald-600" size={24} />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                My Story
              </h3>
            </div>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I&apos;m Ado — a Computer Science student with a passion for
                technology and a drive to help people. What started as fixing
                friends&apos; laptops and designing posters has grown into a
                real freelancing business serving clients across Rwanda and
                beyond.
              </p>
              <p>
                As a full-stack developer, I build websites and web applications
                that solve actual business problems. I&apos;ve worked on
                everything from small business landing pages to full admin
                dashboards with databases and authentication.
              </p>
              <p>
                Beyond code, I&apos;m also an IT support technician and graphic
                designer. I install Windows, troubleshoot computers, design
                professional CVs, create wedding invitations, and manage social
                media for local businesses. This mix of skills lets me offer
                complete solutions — not just code, but the full package.
              </p>
              <p>
                Right now I&apos;m balancing my studies with freelance work,
                constantly learning new technologies and improving my craft. Every
                project teaches me something new, and every client relationship
                pushes me to deliver better results.
              </p>
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-3">
              <Target className="text-emerald-600" size={24} />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Goals & Vision
              </h3>
            </div>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                My goal is to become a top-tier full-stack developer while
                building a sustainable freelancing business that serves real
                clients with quality work at fair prices.
              </p>
              <p>
                I want to specialize in building web solutions for small
                businesses in East Africa — helping them establish a strong
                online presence, manage their operations digitally, and grow
                their customer base.
              </p>
              <p>
                Long term, I plan to launch my own tech startup focused on
                practical software solutions for everyday problems in our
                communities.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-square">
              <Image
                src={IMAGES.about}
                alt={SITE.name}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {SITE.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{SITE.title}</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              📍 Rwanda · {SITE.phone}
            </p>
            <Button
              href="/cv-adolphe-kwizera.pdf"
              variant="outline"
              className="mt-6 w-full"
            >
              <Download size={18} />
              Download CV
            </Button>
            </div>
          </Card>

          {SKILLS.map((group) => (
            <Card key={group.category}>
              <h4 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="cyan">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
