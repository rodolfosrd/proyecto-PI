  import Vue from 'vue'
  import App from './App.vue'
  import router from './router/router'
  import { BootstrapVue } from 'bootstrap-vue'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import VueToast from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-default.css';



  Vue.use(VueToast);
  let instance = Vue.$toast.open('You did it!');
  instance.close();
  Vue.$toast.clear();

  Vue.use(BootstrapVue);
  Vue.config.productionTip = false

  new Vue({
      router,
      render: h => h(App),
  }).$mount('#app')