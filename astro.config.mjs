// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server",
  // adapter: node({ mode: "standalone" }),
  adapter: netlify(),
});
