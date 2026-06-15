export const SERVICES = [
  {
    category: "Web Services",
    items: [
      {
        title: "Website Development",
        description:
          "Professional websites for businesses, portfolios, and personal brands. Built with modern tech, fast loading, and mobile-friendly design.",
        message: "Hi Ado! I'm interested in website development services.",
      },
      {
        title: "Web Apps & Dashboards",
        description:
          "Custom web applications and admin dashboards for managing your business data, inventory, or customer records.",
        message: "Hi Ado! I need a web app or dashboard built.",
      },
      {
        title: "Bug Fixing & Maintenance",
        description:
          "Already have a website? I fix bugs, update content, improve performance, and keep your site running smoothly.",
        message: "Hi Ado! I need help fixing or maintaining my website.",
      },
    ],
  },
  {
    category: "Design Services",
    items: [
      {
        title: "CV / Resume Design",
        description:
          "Stand out with a professionally designed CV that highlights your skills and experience. Perfect for job applications.",
        message: "Hi Ado! I'd like a professional CV/resume designed.",
      },
      {
        title: "Invitation Cards",
        description:
          "Beautiful custom invitations for weddings, birthdays, graduations, and corporate events. Digital and print-ready files.",
        message: "Hi Ado! I need invitation cards designed for an event.",
      },
      {
        title: "Posters & Branding",
        description:
          "Eye-catching posters, flyers, and brand identity materials for your business, event, or social media campaigns.",
        message: "Hi Ado! I need posters or branding design work.",
      },
    ],
  },
  {
    category: "IT Services",
    items: [
      {
        title: "Windows Installation",
        description:
          "Fresh Windows installation with proper drivers, updates, and essential software setup for your laptop or desktop.",
        message: "Hi Ado! I need Windows installed on my computer.",
      },
      {
        title: "Software Setup",
        description:
          "Installation and configuration of productivity software, design tools, development environments, and antivirus.",
        message: "Hi Ado! I need software setup on my computer.",
      },
      {
        title: "Computer Troubleshooting",
        description:
          "Slow computer? Virus issues? Hardware problems? I diagnose and fix common PC problems so you can get back to work.",
        message: "Hi Ado! My computer has a problem I need help with.",
      },
    ],
  },
  {
    category: "Online Services",
    items: [
      {
        title: "Social Media Management",
        description:
          "Content planning, posting schedules, and engagement strategies to grow your business presence on social platforms.",
        message: "Hi Ado! I need social media management for my business.",
      },
      {
        title: "Business Page Setup",
        description:
          "Professional Facebook, Instagram, and Google Business page setup with branding, bio, and initial content.",
        message: "Hi Ado! I need help setting up my business pages online.",
      },
    ],
  },
] as const;

export const SKILLS = [
  {
    category: "Web Development",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend Systems",
    skills: ["Node.js", "REST APIs", "Prisma", "MySQL", "Authentication"],
  },
  {
    category: "Database Management",
    skills: ["MySQL", "PostgreSQL", "Schema Design", "Data Modeling"],
  },
  {
    category: "Graphic Design",
    skills: ["Photoshop", "Canva", "CV Design", "Invitations", "Branding"],
  },
  {
    category: "IT Support",
    skills: [
      "Windows Installation",
      "Software Setup",
      "Troubleshooting",
      "Hardware Basics",
    ],
  },
] as const;
