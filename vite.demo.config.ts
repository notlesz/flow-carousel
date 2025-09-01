import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Configuração específica para build da demo/landing page
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "demo-dist",
    rollupOptions: {
      input: "index.html",
    },
  },
  base: "/", // Base path para Vercel
});
