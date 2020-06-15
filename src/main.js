import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router"
import Vuelidate from "vuelidate";

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

Vue.use(Vuelidate);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
