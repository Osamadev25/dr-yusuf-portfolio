import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this project from a sub-path in production, while
// the local dev server must keep serving from the root. `vite build` and
// `vite preview` default to mode "production"; `vite dev` uses "development".
const PAGES_BASE = "/dr-yusuf-portfolio/";

// Vercel sets VERCEL=1 and VERCEL_ENV (production | preview | development)
// during its builds. Both Production and Preview deployments are served from
// the root, so they must override the GitHub Pages sub-path even though Vercel
// also runs the build in production mode. GitHub Actions sets neither variable.
const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

export default defineConfig(({ mode }) => ({
  base: isVercel ? "/" : mode === "production" ? PAGES_BASE : "/",
  plugins: [react(), tailwindcss()],
}));


