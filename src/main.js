import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/style.css"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
