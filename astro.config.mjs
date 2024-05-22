import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import auth from "auth-astro";


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [db(), tailwind(), auth()]
});