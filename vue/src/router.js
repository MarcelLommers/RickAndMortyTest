import Vue from "vue";
import VueRouter from "vue-router";

import RouteData from "./data/RouteData";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: RouteData
});
