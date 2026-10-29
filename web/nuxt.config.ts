export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'VietNote — Ghi chú AI cho tiếng Việt (sắp ra mắt)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'VietNote đang được xây dựng: biến cuộc họp, bài giảng và video thành ghi chú tiếng Việt thông minh. Đăng ký để được dùng thử sớm.',
        },
        { property: 'og:title', content: 'VietNote — Ghi chú AI cho tiếng Việt' },
        { property: 'og:description', content: 'Nghe. Hiểu. Hành động. Sắp ra mắt.' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
