import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import VC from 'vc';

createApp(App).use(router).use(VC).mount('#app')
