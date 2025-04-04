// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    secretKey: process.env.SECRET_KEY, // Para acceder a tu SECRET_KEY
    public: {
      API_URL: process.env.API_URL, // Para acceder a la URL de tu API
    },
  },

  compatibilityDate: '2025-03-17',
})