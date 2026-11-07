export const siteConfig = {
  name: "The Carcino Foundation",
  shortName: "Carcino",
  tagline: "Breaking Down Cancer for Everyone",
  description:
    "From rural cancer care infrastructure and veterinary oncology to youth-driven cancer literacy, The Carcino Foundation turns knowledge into early detection and action.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://carcinofoundationofficial.org",
  links: {
    contactEmail: "thecarcinofoundation@gmail.com",
    instagram: "https://instagram.com/thecarcinofoundation",
    linkedin: "https://linkedin.com/company/thecarcinofoundation",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Blogs & Perspectives", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Team", href: "/team" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
