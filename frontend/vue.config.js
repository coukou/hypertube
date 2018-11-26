const path = require("path");

module.exports = {
  configureWebpack: config => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src")
    };
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
