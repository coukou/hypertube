import "N3-components/dist/index.min.css";

import Vue from "vue";
import N3Components from "N3-components";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from './i18n'

Vue.config.productionTip = false;
Vue.use(N3Components, "en");

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
