import { resolve } from "path/win32";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias:{
    "@": resolve(__dirname, "/")
  },
  css: ["~/assets/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true }

})
