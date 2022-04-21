import { defineComponent, PropType, isVue3 } from 'vue-demi';

export default defineComponent({
  name: 'vc-button',
  props: {
    type: {
      type: String as PropType<string>,
      default: 'default',
    },
  },
  setup(props, ctx) {
    let listeners: { [prop: string]: Function } = {};

    if (isVue3) {
      listeners = ['click'].reduce((c, n) => {
        if (ctx.attrs[n] && typeof ctx.attrs[n] === 'function') {
          c[n] = ctx.attrs[n] as Function;
        }
        return c;
      }, listeners);
    }

    return {
      listeners
    }
  }
});
