<template>
  <div
    :id="id"
    :name="name"
    class="column"
    @dragover.prevent
    @drop.prevent="drop"
    @drop="dropped"
    @dragstart="left"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: ["id", "name"],
  data() {
    return {};
  },

  methods: {
    drop: (e) => {
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      if (task != null && task != undefined) {
        task.style.display = "block";
        e.target.appendChild(task);
      }
    },

    dropped(e) {
      const droppedToId = e.target.id.substring(7);
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      if (task != null && task != undefined) {
        this.$emit("dropped", droppedToId, task_id);
      }
    },

    left(e) {
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      if (task != null && task != undefined) {
        this.$emit("left");
      }
    },
  },
};
</script>
