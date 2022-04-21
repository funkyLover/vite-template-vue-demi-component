<style lang="scss"></style>

<script lang="ts">
import { defineComponent, PropType, computed, isVue3, h } from 'vue-demi';

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
          // click => onClick
          let key = 'on' + n.slice(0, 1).toUpperCase() + n.slice(1);
          c[key] = ctx.attrs[n] as Function;
        }
        return c;
      }, listeners);
    }

    return {
      listeners
    }
  },
  render() {
    return h('button', {
        on: isVue3 ? undefined : this.$listeners,
        ...this.listeners,
        class: ['vc-btn', `vc-btn-${this.type}`]
      },
      this.$slots.default ? (isVue3 ? this.$slots.default() : this.$slots.default) : null
    )
  }
});
</script>

