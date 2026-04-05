import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // Explicit root for production
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          recharts: ["recharts"],
          ui: [
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "lucide-react",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  preview: {
    port: 4173,
    open: true,
    // Production preview: BrowserRouter works automatically with base: '/'
  },
});
