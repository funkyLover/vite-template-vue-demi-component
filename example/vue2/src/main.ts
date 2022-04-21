import Vue from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import VC from 'vc';

Vue.config.productionTip = false
Vue.use(VC);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
