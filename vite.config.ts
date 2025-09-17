import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import reactScan from "@react-scan/vite-plugin-react-scan";

export default defineConfig(({ mode }) => ({
  server: {
    port: 3001,
  },

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
    },
  },
  // react scan creates some errors in console
  plugins: [react(), tailwindcss(), ...(mode === "development" ? [reactScan()] : [])],
}));
