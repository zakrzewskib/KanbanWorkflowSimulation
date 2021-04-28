<template>
  <div
    v-bind:style="styleObject"
    :id="id"
    :name="name"
    class="column"
    @dragover.prevent
    @drop.prevent="drop"
    @drop="dropped"
    @dragstart="left"
  >
    <h2>{{ name }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["id", "name"],
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

    dropped(e) {
      var droppedToId = e.target.id.substring(7);
      this.$emit("dropped", droppedToId);
    },

    left() {
      this.$emit("left");
    },
  },
};
</script>
