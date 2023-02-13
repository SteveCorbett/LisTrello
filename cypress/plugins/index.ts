const { VuePlugin } = require("@vitejs/plugin-vue");

module.exports = (on) => {
  on("file:preprocessor", VuePlugin.process());
};
