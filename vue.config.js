const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 3911,
    proxy: {
      '/api': {
        target: "http://192.168.0.24:8080",
        changeOrigin : true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
