import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless"; // dùng bản serverless
import compress from "astro-compress";

export default defineConfig({
  output: "server",
  adapter: vercel(),

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
});
