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
    <!-- <div class = "startDate">
    Start
    <br>
    <input class="date" v-model="start">
    </div>

    <div class = "endDate">
    End
    <br>
    <input class="date" v-model="end">
    {{end}}
    </div> -->

    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: '',
      end: '',
    }

  },
  props: ["id", "name", "draggable"],
  methods: {
    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },
  },
};
</script>