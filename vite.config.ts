import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [react(), tailwindcss()],
});
