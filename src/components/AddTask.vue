<template>
  <div>
    <button v-on:click="onClick">Add new task</button>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  methods: {
    onClick() {
      const newTask = {
        id: Math.random(),
        name: "Normal task",
        day: "11.11",
      };
      // console.log(newTask);
      this.$emit("add-task", newTask);
    },
  },
};
</script>
