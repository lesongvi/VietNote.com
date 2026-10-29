export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/v1',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'VietNote — Ghi chú họp bằng tiếng Việt (đang xây dựng)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'VietNote đang được xây dựng: biến cuộc họp, bài giảng và video thành ghi chú tiếng Việt thông minh. Đăng ký để được dùng thử sớm.',
        },
        { property: 'og:title', content: 'VietNote — Ghi chú AI cho tiếng Việt' },
        { property: 'og:description', content: 'Nghe. Hiểu. Hành động. Sắp ra mắt.' },
        { name: 'theme-color', content: '#f5f0e6' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Patrick+Hand&display=swap',
        },
      ],
    },
  },
})
