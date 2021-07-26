import { NuxtConfig } from '@nuxt/types';

// TODO switch to .env
const isDev = true;

const config: NuxtConfig = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nest-modal',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  dev: isDev,
  srcDir: './client/',
  buildDir: isDev ? '.nuxt' : './dist/.nuxt',
  telemetry: false,
  target: 'server',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/axios-accessor.ts', ssr: true },],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // TODO switch to .env
    baseURL: 'http://localhost:3000',
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
    },
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};

export default config;
