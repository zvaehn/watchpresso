module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/watchpresso/' : '/',
  css: {
    loaderOptions: {
      sass: {
        // prependData: '@import "@/assets/scss/abstracts/__abstracts.scss";',
      },
    },
  },
  pwa: {
    name: 'WatchPresso',
    themeColor: '#382C2C',
    msTileColor: '#382C2C',
  },
};
