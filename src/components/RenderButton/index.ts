import RenderButtonVue from './RenderButton.vue';

const RenderButton = {
    install(app: any) {
      app.component('vc-render-button', RenderButtonVue);
    },
};

export default RenderButton;
