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
    <button v-on:click="clicked" class="member"></button>

    <br />
    <div class="productivity">
      <button class="prodPoint"></button>
    </div>
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
  props: ["id", "name", "draggable", "urgent", "fixedDate", "member"],
  methods: {
    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },
    clicked(e) {
      this.$emit("change-author", e);
    }
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

.productivity .mycheck {
  margin-left: 4px;
}

.member {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
}

.mycheck {
  background: red;
}

.prodPoint {
  width: 14px;
  height: 14px;
  background-color: white;
  border: 1px solid black;
}

.white {
  width: 14px;
  height: 14px;
  background-color: white;
}

.blue {
    width: 14px;
  height: 14px;
  background-color: blue;
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
