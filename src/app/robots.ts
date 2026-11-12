import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://carcinofoundationofficial.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "anthropic-ai",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
