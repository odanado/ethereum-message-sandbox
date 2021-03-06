import NuxtConfiguration from '@nuxt/config'

const colors = require('vuetify/es5/util/colors').default

function getEnv() {
  if (!process.env.MESSAGE_CONTRACT_ADDRESS) {
    throw new Error('MESSAGE_CONTRACT_ADDRESS is undefined')
  }
  const env = {
    MESSAGE_CONTRACT_ADDRESS: process.env.MESSAGE_CONTRACT_ADDRESS
  }
  return env
}

const config: NuxtConfiguration = {
  mode: 'universal',
  env: {
    ...getEnv()
  },
  router: {
    base: '/ethereum-message-sandbox/'
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/web3', ssr: false },
    { src: '~/plugins/qurage-link', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/vuetify', '@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  },
  build: {
    quiet: false
  }
}

export default config
