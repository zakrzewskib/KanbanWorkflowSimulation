<template>
  <div
    :id="id"
    :name="name"
    class="task"
    v-bind:class="{ urgent: urgent, fixedDate: fixedDate }"
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
      start: "",
      end: "",
    };
  },
  props: ["id", "name", "draggable", "urgent", "fixedDate"],
  methods: {
    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },
  },
};
</script>

<style scoped>
.task {
  padding: 15px 25px;
  cursor: pointer;
  margin-bottom: 15px;
  border: 2px solid black;
  background-color: rgb(241, 241, 241);
}

.urgent {
    background-color: rgb(255, 167, 167);
}

.fixedDate {
    background-color: rgb(200, 255, 207);
} 
/* .startDate,
.endDate {
    font-size: 11px;
    color: black;
    width: 50%;
    margin-right: 20px;
    border: 2px solid black;
}

.date {
    margin-right: 0px;
    width: 50%;
} */
</style>
