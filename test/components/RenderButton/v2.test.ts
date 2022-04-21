import { mount } from '@vue/test-utils1'
import RenderButton from '../../../src/components/RenderButton/RenderButton.vue'
import { describe, expect, it, vi } from 'vitest';

const mountButton = (props?: Record<any, any>) => {
  return mount(RenderButton, { propsData: props });
}

describe('button with render', async() => {
  it('props[type]', async () => {
    const wrapper = mountButton();
    expect(wrapper.props().type).toBe("default");
    expect(wrapper.find(".vc-btn-default").exists()).toBeTruthy();

    const type = "primary";
    const wrapperWithProps = mountButton({ type });
    expect(wrapperWithProps.props().type).toBe(type);
    expect(wrapperWithProps.find(`.vc-btn-${type}`).exists()).toBeTruthy()
  })

  it('on click', async () => {
    const onClick = vi.fn();
    const wrapper = mount(RenderButton, {
      listeners: {
        click: onClick
      }
    });
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  });

  it('slot', async () => {
    const wrapper = mount(RenderButton, {
      slots: {
        default: `<div class="slot"></div>`
      }
    });
    expect(wrapper.find('.slot')).toBeTruthy();
  });
})
