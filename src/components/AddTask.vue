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
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    onClick() {
      var tasksTypes = ["Normal task", "Urgent task", "Fixed date task"];
      var random = this.randomIntFromInterval(1, 100);
      var index;
      if(random <= 50) {
        index = 0;
      } else if (random > 50 && random <= 75) {
        index = 1;
      } else {
        index = 2;
      }

      const newTask = {
        id: Math.random(),
        name: tasksTypes[index],
        // day: "11.11",
      };
      // console.log(newTask);
      this.$emit("add-task", newTask);
    },
  },
};
</script>
