import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel"; // <-- CHỈ DÙNG DÒNG NÀY
import compress from "astro-compress";

export default defineConfig({
  output: "server", // hoặc "hybrid", tùy app bạn có dùng SSR không
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
