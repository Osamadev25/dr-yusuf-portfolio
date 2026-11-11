import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this project from a sub-path in production, while
// the local dev server must keep serving from the root. `vite build` and
// `vite preview` default to mode "production"; `vite dev` uses "development".
const PAGES_BASE = "/dr-yusuf-portfolio/";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? PAGES_BASE : "/",
  plugins: [react(), tailwindcss()],
}));


