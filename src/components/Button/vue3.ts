import ButtonVue from './vue3.vue';

const Button = {
    install(app: any) {
      app.component('vc-button', ButtonVue);
    },
};

export default Button;
