import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Toasted from 'vue-toasted';
 
Vue.use(VueRouter)
Vue.use(Toasted, { 
  theme: "bubble", 
  position: "bottom-center", 
  duration : 5000
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
