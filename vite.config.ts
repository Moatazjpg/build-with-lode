import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    tailwindcss(),
    react(),
    tsconfigPaths(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
  ],
  optimizeDeps: {
    exclude: ["@tanstack/react-start", "@tanstack/react-start/server-entry"],
  },
});
