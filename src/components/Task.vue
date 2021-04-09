<template>
  <div
    :id="id"
    :name="name"
    class="task"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragover.stop
  >
    {{ name }}
    <slot />
  </div>
</template>

<script>
export default {
  props: ["id", "name", "draggable"],
  methods: {
    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },
  },
};
</script>