import Vue from "vue";
import App from "./App.vue";
import move from "./directive/move";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.directive(...move);
Vue.use(Element, { size: "small", zIndex: 3000 });

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
