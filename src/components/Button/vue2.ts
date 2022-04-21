import ButtonVue from './vue2.vue';

const Button = {
    install(app: any) {
      app.component('vc-button', ButtonVue);
    },
};

export default Button;
