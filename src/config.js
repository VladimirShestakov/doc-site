const isWeb = process.env.TARGET === 'web';

let config = {
  dev: {
    port: 8141,
  },
  //  Параметры запуска сервера для рендера
  ssr: {
    host: 'localhost',
    port: 8142,
    preloadState: true,
  },
  content: {
    target: 'https://raw.githubusercontent.com/VladimirShestakov/react-guide/develop',
    secure: false,
    changeOrigin: true,
    patterns: ['/assets/**'],
  },

  api: {
    // Обычно хост на апи относительный и используется прокси для устранения CORS
    baseURL: isWeb ? '' : 'http://localhost:8142',
    tokenHeader: 'X-Token',

    // Прокси на апи, если режим разработки или ssr без nginx
    proxy: {
      // '/data/**': {
      //   target: 'https://raw.githubusercontent.com/VladimirShestakov/doc-site/develop/content/',
      //   secure: true,
      //   changeOrigin: true,
      //   //prependPath: false,
      // },
      // '/assets/**': {
      //   target: 'https://raw.githubusercontent.com/VladimirShestakov/doc-site/develop/content/',
      //   secure: true,
      //   changeOrigin: true,
      //   //prependPath: false,
      // },
    },
  },

  navigation: {
    basename: '/', // если фронт доступен по вложенному пути
    type: isWeb ? 'browser' : 'memory',
  },
};

module.exports = config;
