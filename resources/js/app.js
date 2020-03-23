
require('./bootstrap');

import Vue from 'vue'
import App from './app.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'


Vue.use(BootstrapVue)

new Vue({
  router,
  render :h =>h(App)
}).$mount('#app')
