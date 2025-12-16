import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";
import compress from "astro-compress";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),

  integrations: [
    tailwind(),
    react(),
    compress({
      html: true,
      css: true,
      js: true,
      svg: true,
      img: true,
    }),
  ],

  vite: {
    build: {
      sourcemap: false,
    },
  },

  server: {
    port: 4555,
    host: true,
  },
});
