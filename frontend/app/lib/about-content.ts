import type { StatItem, ServiceItem, TeamMember } from "@/types/about";

export const stats: StatItem[] = [
  { value: 2020, suffix: "", label: "Founded in" },
  { value: 450, suffix: "+", label: "Clients" },
  { value: 300, suffix: "+", label: "Projects" },
  { value: 15, suffix: "+", label: "Industries" },
  { value: 20, suffix: "+", label: "Countries" },
  { value: 10, suffix: "+", label: "Employees" },
];

export const services: ServiceItem[] = [
  {
    title: "Social Media Management",
    summary: "Build your brand's voice and grow your community with full-funnel social media management.",
    description:
      "We design result-driven strategies, create engaging visuals, manage influencer collaborations, and optimize campaigns across Instagram, Facebook, LinkedIn, and TikTok — ensuring consistent brand messaging and measurable ROI.",
  },
  {
    title: "Digital Marketing",
    summary: "From PPC and content to automation and funnels — attract, convert, and retain customers.",
    description:
      "Tailored digital marketing strategies drive consistent ROI across global markets, combining data-driven insights with creative execution to reach your target audience.",
  },
  {
    title: "Android App Development",
    summary: "Secure, scalable, and user-friendly Android applications optimized for speed and UX.",
    description:
      "We leverage the latest technologies and best practices to build apps that deliver exceptional user experiences and drive business success.",
  },
  {
    title: "Web Development",
    summary: "Modern, responsive, SEO-ready websites with end-to-end performance optimization.",
    description:
      "Whether corporate, eCommerce, or portfolio, every site is built on the latest frameworks — SEO-ready, fast, and fully secure.",
  },
  {
    title: "Graphic Designing",
    summary: "Logos, brand kits, campaigns, and UI/UX that deliver a memorable brand presence.",
    description:
      "Our creative team combines artistic vision with strategic thinking to deliver designs that resonate with your audience and strengthen your brand.",
  },
  {
    title: "Video Editing",
    summary: "Corporate videos, product reels, promos, and motion graphics aligned to your story.",
    description:
      "We combine technical expertise with creative storytelling to turn raw footage into cinematic content that captivates audiences.",
  },
  {
    title: "Academic Research Writing",
    summary: "From literature reviews to journal-ready manuscripts — structured and compliant.",
    description:
      "We help universities, researchers, and professionals produce plagiarism-free, well-structured papers with rigorous methodology and proper citation.",
  },
  {
    title: "SEO Management",
    summary: "Rank higher with data-driven keyword research, on-page optimization, and backlinks.",
    description:
      "We build a complete technical, content, and authority strategy that improves visibility, boosts organic traffic, and drives real business outcomes.",
  },
  {
    title: "Lead Generation",
    summary: "Automation, analytics, and creative funnels to acquire qualified leads efficiently.",
    description:
      "Targeted campaigns across multiple channels connect you with decision-makers, identifying high-value prospects and nurturing them through personalized engagement.",
  },
  {
    title: "Cybersecurity & Intelligence",
    summary: "OSINT, forensics, VAPT, and research writing to protect what matters most.",
    description:
      "Security research writing, targeted OSINT, digital forensics, and end-to-end vulnerability assessment & penetration testing (VAPT) for your digital assets.",
  },
  {
    title: "Infrastructure & Operations",
    summary: "IT support, network security, and Linux administration for a reliable backbone.",
    description:
      "Continuous IT support, firewalls and threat detection, and secure, optimized Linux environments managed by certified professionals.",
  },
  {
    title: "Secure Development",
    summary: "Secure full-stack development and AI in cybersecurity for next-gen defense.",
    description:
      "Strong security frameworks from front-end design to backend architecture, plus AI applied to threat detection, automation, and system hardening.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Syed Ghazi",
    role: "Founder",
    bio: "Leading the company's marketing, social media, and creative direction with a strong focus on brand growth and impactful digital outreach.",
  },
  {
    name: "Maryam Hassny",
    role: "CEO & Co-Founder",
    bio: "Leading Orbitwelve's vision and growth through innovation, creativity, and results-driven digital solutions.",
  },
];