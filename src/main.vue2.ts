
import Button from './components/Button/vue2.vue';
import ButtonRender from './components/RenderButton/RenderButton.vue'

const Comp = {
  install(app: any) {
    app.component('vc-button', Button);
    app.component('vc-render-button', ButtonRender);
  }
}

export default Comp
