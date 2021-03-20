import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import css from './assets/css/main.css'
import SmartTable from 'vuejs-smart-table'

Vue.use(SmartTable)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  css,
  render: h => h(App)
}).$mount('#app')
