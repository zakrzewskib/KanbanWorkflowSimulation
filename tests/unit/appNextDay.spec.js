import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";

test("Click next day button - number of days", async() => {
    // given
    const appWrapper = mount(App);
    const currentDay = appWrapper.find("#currentDay");
    const nextDayButton = appWrapper.find("#nextDay");

    var expectedBefore = "Number of days: 0";
    var expectedAfter = "Number of days: 1";

    expect(currentDay.text()).toContain(expectedBefore);

    // when
    await nextDayButton.trigger("click");

    // then
    expect(currentDay.text()).toContain(expectedAfter);
});

test("Click next day button - current Date", async() => {
    // given
    const appWrapper = mount(App);
    const currentDate = appWrapper.find("#currentDate");
    const nextDayButton = appWrapper.find("#nextDay");

    var expectedBefore = new Date();
    var expectedAfter = new Date();
    expectedAfter.setDate(expectedBefore.getDate() + 1)


    expectedBefore = "Current date (dd/mm/yyyy):\n" + expectedBefore.toLocaleDateString();

    expectedAfter = "Current date (dd/mm/yyyy):\n" + expectedAfter.toLocaleDateString();

    expect(currentDate.text()).toContain(expectedBefore);

    // when
    await nextDayButton.trigger("click");

    // then
    expect(currentDate.text()).toContain(expectedAfter);
});