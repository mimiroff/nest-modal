import { NuxtConfig } from '@nuxt/types';

import { getConfig, NodeEnvironment } from './server/config';

const conf = getConfig();
const isDev = conf.NODE_ENV === NodeEnvironment.Development;

const config: NuxtConfig = {
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

  css: [],

  plugins: [{ src: '~/plugins/axios-accessor.ts', ssr: true }],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          name: 'Authorization',
          type: 'Bearer',
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/users/me', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },
  },

  axios: {
    baseURL: conf.APP_DOMAIN,
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
    },
  },
  build: {},
};

export default config;
