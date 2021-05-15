<template>
  <div>
    <button class="button8" v-on:click="onClick">Add new task</button>
  </div>
</template>

<script>
export default {
  name: "AddTask",
    data() {
      return {
        taskNumber: 1,
      }

  },
  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    onClick() {
      var tasksTypes = ["Normal task", "Urgent task", "Fixed date task"];
      var random = this.randomIntFromInterval(1, 100);
      var index;
      var urgent = false;
      var fixedDate = false;
      var nr = this.taskNumber;
      if(random <= 50) {
        index = 0;
      } else if (random > 50 && random <= 75) {
        index = 1;
        urgent = true;
      } else {
        index = 2;
        fixedDate = true;
      }
      this.taskNumber++;

      const newTask = {
        id: Math.random(),
        name: tasksTypes[index],
        urgent: urgent,
        fixedDate: fixedDate,
        nr: nr,
      };
      this.$emit("add-task", newTask);
    },
  },
};
</script>
