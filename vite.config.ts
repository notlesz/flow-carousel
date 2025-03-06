import react from "@vitejs/plugin-react";
import external from "rollup-plugin-peer-deps-external";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MinhaBibliotecaReact",
      fileName: (format) => `minha-biblioteca-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [external()],
    },
  },
});
