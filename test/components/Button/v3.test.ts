import { mount } from '@vue/test-utils'
import Button from '../../../src/components/Button/vue3.vue'
import { describe, expect, it, vi } from 'vitest';

const moountButton = (props?: Record<any, any>) => {
  return mount(Button, { props });
}

describe('button with template', async() => {
  it('props[type]', () => {
    const wrapper = moountButton();
    expect(wrapper.props().type).toBe('default');
    expect(wrapper.find('.vc-btn-default').exists()).toBeTruthy();

    const type = 'primary';
    const wrapperWithProps = moountButton({ type });
    expect(wrapperWithProps.props().type).toBe(type);
    expect(wrapperWithProps.find(`.vc-btn-${type}`).exists()).toBeTruthy();
  })

  it('on click', async () => {
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      attrs: {
        click: onClick
      }
    });
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  });

  it('slot', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: `<div class="slot">slot</div>`
      }
    });
    expect(wrapper.find('.slot').exists()).toBeTruthy();
  });
})
