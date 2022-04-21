import { createApp } from 'vue'
import App from './App.vue'
import VCButton from '../src/components/Button/vue3'

const app = createApp(App)
app.use(VCButton);
app.mount('#app')
