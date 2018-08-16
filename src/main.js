import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import store from "./store/";
import routerMap from "./router";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: "hash",
  base: __dirname,
  routes: routerMap
});
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
