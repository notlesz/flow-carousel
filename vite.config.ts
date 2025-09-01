import react from "@vitejs/plugin-react";
import external from "rollup-plugin-peer-deps-external";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    // TypeScript declarations generation - simplified approach
    dts({
      entryRoot: "src",
      exclude: [
        "src/App.tsx",
        "src/LandingPage.tsx",
        "src/main.tsx",
        "**/*.module.scss",
      ],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "FlowCarousel",
      fileName: (format) => `flow-carousel.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [external()],
    },
  },
});
