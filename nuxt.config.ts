// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@morev/vue-transitions/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
  ],
  runtimeConfig: {
    authSecret: '', // Set by NUXT_AUTH_SECRET environment variable
  },
  auth: {
    origin: process.env.AUTH_ORIGIN,
    defaultProvider: 'credentials',
  },
  colorMode: {
    preference: 'dark',
    dataValue: 'theme',
    classSuffix: '',
  },
  googleFonts: {
    prefetch: true,
    families: {
      Lato: true,
      'Rubik+Bubbles': true,
    },
  },
  eslint: {
    lintOnStart: false,
  },
  typescript: {
    strict: true,
  },
});
