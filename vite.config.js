import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Vercel deployment configuration
function siteMetadata(configuredSiteUrl) {
  const DEFAULT_PRODUCTION_URL = "https://dr-yusuf-portfolio.vercel.app/";
  const effectiveUrl = configuredSiteUrl || DEFAULT_PRODUCTION_URL;
  let siteUrl;

  try {
    const parsed = new URL(effectiveUrl);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash) {
      throw new Error("VITE_SITE_URL must be a public HTTPS URL without credentials, query, or hash.");
    }
    siteUrl = `${parsed.origin}${parsed.pathname.replace(/\/+$/, "")}/`;
  } catch (error) {
    throw new Error(`Invalid VITE_SITE_URL: ${error.message}`);
  }

  return {
    name: "site-metadata",
    transformIndexHtml(html) {
      const canonical = siteUrl
        ? `<link rel="canonical" href="${siteUrl}">`
        : "";
      const socialTags = siteUrl
        ? `<meta property="og:url" content="${siteUrl}">\n    <meta property="og:image" content="${new URL("images/doctor-portrait.jpg", siteUrl)}">\n    <meta name="twitter:image" content="${new URL("images/doctor-portrait.jpg", siteUrl)}">`
        : "";

      return html
        .replace("    <!-- SITE_CANONICAL -->", canonical)
        .replace("    <!-- SITE_SOCIAL_URLS -->", socialTags);
    },
    closeBundle() {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}</loc>\n  </url>\n</urlset>\n`;
      writeFileSync(resolve("dist", "sitemap.xml"), sitemap);
      writeFileSync(resolve("dist", "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    base: "/",
    plugins: [react(), tailwindcss(), siteMetadata(env.VITE_SITE_URL?.trim())],
  };
});


