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
    <div>
      Authors:
      <button v-on:click="changeMemeber" class="member"></button>
      <button class="member"></button>
    </div>

    <br />
    {{ name }}

    <br />

    <div class="productivity">
      <!-- <button
        v-on:click="addedProdPoint"
        class="prodButton"
        v-for="button in buttons"
        :key="button.id"
        :id="button.id"
      ></button> -->
      <button v-on:click="addedProdPoint1" class="prodButton"></button>
      <button  v-on:click="addedProdPoint2" class="prodButton"></button>
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
      colors: ["red", "blue", "green", "yellow"],
      currentMemeber: 0,
      numberOfMembers: 4,
      buttons: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
      ],
    };
  },

  props: ["id", "name", "draggable", "urgent", "fixedDate", "member"],

  methods: {

    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },

    changeMemeber(e) {
      if (this.currentMemeber > this.numberOfMembers) {
        this.currentMemeber = 0;
      } else {
        this.currentMemeber++;
      }
      this.$emit("change-author", e);
    },

    addedProdPoint(e) {
      console.log(e.target);
    },

    addedProdPoint1() {
      console.log("pierwszy");
    },

    addedProdPoint2() {
      console.log("drugi");
    },

  },
};
</script>

<style scoped>
.productivity .prodButton {
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

.member {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
}
</style>
