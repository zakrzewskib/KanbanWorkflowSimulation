import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";

it("changes number of days after click", async() => {
    // given
    const appWrapper = mount(App);
    const currentDay = appWrapper.find("#currentDay");
    const nextDayButton = appWrapper.find("#nextDay");

    let expectedBefore = "Number of days: 0";
    let expectedAfter = "Number of days: 1";
    expect(currentDay.text()).toContain(expectedBefore);

    // when
    await nextDayButton.trigger("click");

    // then
    expect(currentDay.text()).toContain(expectedAfter);
});

it("changes date after clicks", async() => {
    // given
    const appWrapper = mount(App);
    const currentDate = appWrapper.find("#currentDate");
    const nextDayButton = appWrapper.find("#nextDay");
    const nrOfClicks = 5;

    let expectedBefore = new Date();
    let expectedAfter = new Date();
    expectedAfter.setDate(expectedBefore.getDate() + nrOfClicks);

    expectedBefore =
        "Current date (dd/mm/yyyy):\n" + expectedBefore.toLocaleDateString();
    expectedAfter =
        "Current date (dd/mm/yyyy):\n" + expectedAfter.toLocaleDateString();

    expect(currentDate.text()).toContain(expectedBefore);

    // when
    for (let i = 0; i < nrOfClicks; i++) {
        await nextDayButton.trigger("click");
    }

    // then
    expect(currentDate.text()).toContain(expectedAfter);
});