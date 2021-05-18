import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

test('Next Day Button Test', async() => {
    const wrapper = mount(App);

    const button = wrapper.find('#nextDay');

    const text = wrapper.find('#currentDay');

    var expectedBefore = "Number of days: 0";
    var expectedAfter = "Number of days: 1";

    expect(text.text()).toContain(expectedBefore);

    await button.trigger('click');

    expect(text.text()).toContain(expectedAfter);
})