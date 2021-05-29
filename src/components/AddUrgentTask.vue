<template>
  <div
    :normalProb="normalProb"
    :urgentProb="urgentProb"
    :fixedDateProb="fixedDateProb"
  >
    <button class="button8" v-on:click="onClick">Add new task</button>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      taskNumber: 1,
    };
  },
  props: ["normalProb", "urgentProb", "fixedDateProb"],

  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    randomSample() {
      const samples = [
        { value: 0, weight: parseInt(this.normalProb) },
        { value: 1, weight: parseInt(this.urgentProb) },
        { value: 2, weight: parseInt(this.fixedDateProb) },
      ];
      let sample =
        Math.random() * samples.reduce((sum, { weight }) => sum + weight, 0);

      const { value } = samples.find(({ weight }) => (sample -= weight) < 0);
      return value;
    },

    onClick() {
      const tasksTypes = ["Normal task", "Urgent task", "Fixed date task"];
      let index;
      let urgent = true;
      let fixedDate = false;
      let nr = this.taskNumber;

      this.taskNumber++;

      const newTask = {
        id: Math.random(),
        name: tasksTypes[index],
        urgent: urgent,
        fixedDate: fixedDate,
        nr: nr,
        done: false,
        todo: true,
        readyForStage2: false,
      };
      this.$emit("add-task", newTask);
    },
  },
};
</script>
