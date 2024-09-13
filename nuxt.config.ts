// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxt/image',
    '@nuxt/content',
  ],

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  compatibilityDate: '2024-07-11',
});