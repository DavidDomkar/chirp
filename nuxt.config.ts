// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth', '@nuxt/devtools'],
  runtimeConfig: {
    authSecret: '', // Set by NUXT_AUTH_SECRET environment variable
  },
  auth: {
    origin: 'https://localhost:3000',
    defaultProvider: 'credentials',
  },
  typescript: {
    strict: true,
  },
});
