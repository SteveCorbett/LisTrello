module.exports = {
  transpileDependencies: [
    "vuetify"
  ],

  configureWebpack: {
    devtool: "source-map"
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
};
