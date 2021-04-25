<template>
  <div
    :id="id"
    :name="name"
    :currentMemeber="currentMemeber"
    class="task"
    v-bind:class="{ urgent: urgent, fixedDate: fixedDate }"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragover.stop
  >
    {{ name }}

    <div class="productivity">
      <button
        :style="prodPointClicked0 ? { 'background-color': colors[1] } : null"
        v-on:click="addedProdPoint0"
        class="prodPoint"
      ></button>

      <button
        :style="prodPointClicked1 ? { 'background-color': 'red' } : null"
        v-on:click="addedProdPoint1"
        class="prodPoint"
      ></button>

      <button
        :style="prodPointClicked2 ? { 'background-color': 'red' } : null"
        v-on:click="addedProdPoint2"
        class="prodPoint"
      ></button>
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
      prodPointClicked0: false,
      prodPointClicked1: false,
      prodPointClicked2: false,
      colors: ["red", "blue", "green", "yellow"],
    };
  },

  props: [
    "id",
    "name",
    "draggable",
    "urgent",
    "fixedDate",
    "currentMemeber",
  ],

  methods: {
    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },

    addedProdPoint0() {
      console.log(this.currentMemeber);
      console.log(this.name);
      this.prodPointClicked0 = !this.prodPointClicked0;
    },
    addedProdPoint1() {
      this.prodPointClicked1 = !this.prodPointClicked1;
    },
    addedProdPoint2() {
      this.prodPointClicked2 = !this.prodPointClicked2;
    },
  },
};
</script>

<style scoped>
.productivity .prodPoint {
  width: 18px;
  height: 18px;
  background-color: white;
  border: 1px solid black;
  margin: 4px;
}

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
</style>
