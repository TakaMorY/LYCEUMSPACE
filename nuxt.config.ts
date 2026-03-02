// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  runtimeConfig: {
    // Приватные ключи (доступны только на сервере)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,

    // Публичные ключи (доступны на клиенте)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY
    }
  },
  app: {
    head: {
      title: 'ЛИЦЕСКОЕПРОСТРАНСТВО ',
      meta: [
        {
          name: 'description',
          content: 'ЛИЦЕСКОЕПРОСТРАНСТВО - неофициальный сайт МАОУ Лицей "Технический" с открытым кодом, разработанный для помощи в обучении лицеистов.'
        },
        {
          name: 'keywords',
          content: 'ЛИЦЕСКОЕПРОСТРАНСТВО, лицей, лицей технический, Владивосток лицей, lyceumspace, учёба, обучение'
        },
        {
          property: 'og:title',
          content: 'ЛИЦЕСКОЕПРОСТРАНСТВО'
        },
        {
          property: 'og:description',
          content: 'ЛИЦЕСКОЕПРОСТРАНСТВО - неофициальный сайт МАОУ Лицей "Технический" с открытым кодом, разработанный для помощи в обучении лицеистов.'
        },
        {
          property: 'og:image',
          content: 'https://lyceumspace.vercel.app/og/og-image.JPG'
        },
        {
          property: 'og:url',
          content: 'https://lyceumspace.vercel.app'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://lyceumspace.vercel.app'
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/icon-32x32.png'
        }
      ]
    }
  }

})