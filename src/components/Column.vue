<template>
  <div
    v-bind:style="styleObject"
    :id="id"
    :name="name"
    :nrOfTasks="nrOfTasks"
    :maximumNrOfTasks="maximumNrOfTasks"
    class="column"
    @dragover.prevent
    @drop.prevent="drop"
    @drop="dropped"
    @dragstart="left"
  >
    <h2>{{ name }}</h2>
    <br />
    Maximum number of tasks: {{ maximumNrOfTasks }}
    <div id="nrOfTasks"> Number of tasks: {{ nrOfTasks }}</div>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["id", "name", "nrOfTasks", "maximumNrOfTasks"],
  data() {
    return {
      maxTasks: 5,
      counter: 0,
      styleObject: {
        background: "",
      },
    };
  },

  methods: {
    drop: (e) => {
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      task.style.display = "block";
      e.target.appendChild(task);
    },

    dropped() {
      // console.log(e.target);
      this.$emit("dropped");
    },

    left() {
      // console.log(e.target);
      this.$emit("left");
    },

  },
};
</script>
