// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  // Configuración del módulo color-mode
  colorMode: {
    preference: 'system', // 'light' | 'dark' | 'system'
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  runtimeConfig: {
    secretKey: process.env.SECRET_KEY,
    public: {
      API_URL: process.env.API_URL,
    },
  },

  compatibilityDate: '2025-03-17',

  nitro: {
    preset: 'netlify',
  },

  typescript: {
    tsConfig: {
      configFile: 'tsconfig.app.json',
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
          type: 'image/x-icon',
        },
      ],
    },
  },
})