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
      <button
          class="prodButton"
          v-for="button in buttons"
          :key="button.id"
          :id="button.id"
        >
        </button>

      <!-- <button
        :style="
          prodPointClicked0
            ? { 'background-color': colors[currentMemeber] }
            : null
        "
        v-on:click="addedProdPoint"
        class="prodPoint"
        id="point-1"
      ></button>
      <button class="prodPoint"></button>
      <button class="prodPoint"></button>
      <button class="prodPoint"></button>
      <button class="prodPoint"></button>
      <br />
      <button class="prodPoint"></button>
      <button class="prodPoint"></button>
      <button class="prodPoint"></button>
      <button class="prodPoint"></button>
      <button class="prodPoint"></button> -->
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
         {
          id: Math.random()
        },
        {
          id: Math.random()
        },
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
      console.log(e.target.id.substring(6));
      this.prodPointClicked0 = true;
      console.log("addedProdPoint");
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
