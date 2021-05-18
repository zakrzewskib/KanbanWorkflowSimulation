import { mount } from '@vue/test-utils'
import App from '../App.vue'

test('a', async() => {
    const wrapper = mount(App)
    const button = wrapper.find('nextDay');
    const text = wrapper.find('numberOfDays');

    expect(text.text()).toContain('Total clicks: 0')

    await button.trigger('click')

    expect(text.text()).toContain('Total clicks: 1')
})