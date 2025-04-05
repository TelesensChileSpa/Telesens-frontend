// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },

  modules: ['@nuxtjs/tailwindcss'],

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
          href: '/favicon.ico',  // Ruta al favicon en public/
          type: 'image/x-icon',
        },
      ],
    },
  },
});
