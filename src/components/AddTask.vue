<template>
  <div>
    <button v-on:click="onClick">Add new task</button>
  </div>
</template>

<script>
export default {
  name: "AddTask",
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
      if(random <= 50) {
        index = 0;
      } else if (random > 50 && random <= 75) {
        index = 1;
        urgent = true;
      } else {
        index = 2;
        fixedDate = true;
      }

      const newTask = {
        id: Math.random(),
        name: tasksTypes[index],
        urgent: urgent,
        fixedDate: fixedDate,
      };
      this.$emit("add-task", newTask);
    },
  },
};
</script>
