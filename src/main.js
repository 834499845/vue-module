import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import store from "./store/";
import routerMap from "./router";
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import vueScroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import base from "./base";

Vue.use(base);
Vue.use(vueScroll);

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
import "swiper/dist/css/swiper.css";
Vue.prototype.$vuescrollConfig = {
  bar: {
    vBar: {
      background: "#ccc"
    }
  }
};
// 并且配置路由规则
const router = new VueRouter({
  // mode: 'hash' history,
  mode: "hash",
  base: __dirname,
  routes: routerMap
});
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
