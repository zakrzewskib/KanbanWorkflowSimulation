<template>
  <div
    :id="id"
    :name="name"
    :member="member"
    :blocked="blocked"
    :nr="nr"
    class="task"
    v-bind:class="{ urgent: urgent, fixedDate: fixedDate }"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragover.stop
  >
    <div class="divWithNr">
      <div class="taskName">
        {{ name }}
        nr. = {{ nr }}
        <em v-on:click="deleteTask" class="fas fa-times" id="delBtn"></em>
                Author:
        <button
          :style="
            authorButtonClicked1
              ? { 'background-color': colors[currentMem11 - 1] }
              : null
          "
          v-on:click="authorButtonClicked"
          class="prodPoint"
        ></button>
        
      </div>

      <div v-if="blocked">
        <button v-on:click="unblock" class="unblockButton">BLOCKED</button>
      </div>
    </div>
    <div class="productivity">
      <small class="stage">S1:</small>
      <button
        :style="
          prodPointClicked1
            ? { 'background-color': colors[currentMem1 - 1] }
            : null
        "
        v-on:click="addedProdPoint1"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked2
            ? { 'background-color': colors[currentMem2 - 1] }
            : null
        "
        v-on:click="addedProdPoint2"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked3
            ? { 'background-color': colors[currentMem3 - 1] }
            : null
        "
        v-on:click="addedProdPoint3"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked4
            ? { 'background-color': colors[currentMem4 - 1] }
            : null
        "
        v-on:click="addedProdPoint4"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked5
            ? { 'background-color': colors[currentMem5 - 1] }
            : null
        "
        v-on:click="addedProdPoint5"
        class="prodPoint"
      ></button>

      <hr class="myLine" />

      <small class="stage">S2:</small>

      <button
        :style="
          prodPointClicked6
            ? { 'background-color': colors[currentMem6 - 1] }
            : null
        "
        v-on:click="addedProdPoint6"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked7
            ? { 'background-color': colors[currentMem7 - 1] }
            : null
        "
        v-on:click="addedProdPoint7"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked8
            ? { 'background-color': colors[currentMem8 - 1] }
            : null
        "
        v-on:click="addedProdPoint8"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked9
            ? { 'background-color': colors[currentMem9 - 1] }
            : null
        "
        v-on:click="addedProdPoint9"
        class="prodPoint"
      ></button>

      <button
        :style="
          prodPointClicked10
            ? { 'background-color': colors[currentMem10 - 1] }
            : null
        "
        v-on:click="addedProdPoint10"
        class="prodPoint"
      ></button>
      <slot />
    </div>
    <div class="divWithNr">
      Start day:
      <input class="date" v-model="startDate" />
      <br />
      End day:
      <input class="date" v-model="endDate" />
      <br />
      <p class="taskCompleted">
        Task completed in: {{ taskCompletedTime }} days
      </p>
    </div>

    <div :style="{ display: fixedDate ? 'block' : 'none' }">
      <p class="toComplete">To do by day</p>
      <input class="toCompleteNumber" v-model="toCompleteIn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prodPointClicked1: false,
      prodPointClicked2: false,
      prodPointClicked3: false,
      prodPointClicked4: false,
      prodPointClicked5: false,
      prodPointClicked6: false,
      prodPointClicked7: false,
      prodPointClicked8: false,
      prodPointClicked9: false,
      prodPointClicked10: false,
      authorButtonClicked1: false,
      colors: [
        "LightCoral",
        "yellow",
        "DarkSeaGreen",
        "CornflowerBlue",
        "MediumPurple",
      ],
      currentMem1: 1,
      currentMem2: 1,
      currentMem3: 1,
      currentMem4: 1,
      currentMem5: 1,
      currentMem6: 1,
      currentMem7: 1,
      currentMem8: 1,
      currentMem9: 1,
      currentMem10: 1,
      currentMem11: 1,
      startDate: "",
      endDate: "",
      toCompleteIn: 10,
    };
  },

  props: [
    "id",
    "name",
    "draggable",
    "urgent",
    "fixedDate",
    "member",
    "blocked",
    "nr",
  ],

  computed: {
    taskCompletedTime: function() {
      const diffDays = parseInt(this.endDate) - parseInt(this.startDate);
      return diffDays + 1;
    },
  },

  methods: {
    dragStart: (e) => {
      const target = e.target;
      e.dataTransfer.setData("task_id", target.id);
    },

    addedProdPoint1() {
      this.currentMem1 = this.member;
      this.prodPointClicked1 = !this.prodPointClicked1;
    },

    addedProdPoint2() {
      this.currentMem2 = this.member;
      this.prodPointClicked2 = !this.prodPointClicked2;
    },

    addedProdPoint3() {
      this.currentMem3 = this.member;
      this.prodPointClicked3 = !this.prodPointClicked3;
    },

    addedProdPoint4() {
      this.currentMem4 = this.member;
      this.prodPointClicked4 = !this.prodPointClicked4;
    },

    addedProdPoint5() {
      this.currentMem5 = this.member;
      this.prodPointClicked5 = !this.prodPointClicked5;
    },

    addedProdPoint6() {
      this.currentMem6 = this.member;
      this.prodPointClicked6 = !this.prodPointClicked6;
    },

    addedProdPoint7() {
      this.currentMem7 = this.member;
      this.prodPointClicked7 = !this.prodPointClicked7;
    },

    addedProdPoint8() {
      this.currentMem8 = this.member;
      this.prodPointClicked8 = !this.prodPointClicked8;
    },

    addedProdPoint9() {
      this.currentMem9 = this.member;
      this.prodPointClicked9 = !this.prodPointClicked9;
    },

    addedProdPoint10() {
      this.currentMem10 = this.member;
      this.prodPointClicked10 = !this.prodPointClicked10;
    },

    authorButtonClicked() {
      this.currentMem11 = this.member;
      this.authorButtonClicked1 = !this.authorButtonClicked1;
    },

    unblock() {
      alert("You unblocked this task!");
      this.$emit("unblocked-task", this.nr);
    },

    deleteTask() {
      this.$emit("delete-task", this.nr);
    },
  },
};
</script>

<style scoped>
.prodPoint {
  width: 18px;
  height: 18px;
  background-color: white;
  border: 1px solid black;
  margin: 4px;
}

.task {
  cursor: pointer;
  margin-bottom: 10px;
  border: 2px solid black;
  background-color: rgb(241, 241, 241);
}

.urgent {
  background-color: rgb(255, 167, 167);
}

.fixedDate {
  background-color: rgb(200, 255, 207);
}

hr.myLine {
  height: 1px;
  border-width: 0;
  color: black;
  background-color: black;
  margin: 0;
}

.unblockButton {
  background-color: red;
  color: white;
}
.divWithNr {
  font-size: 15px;
  margin-left: 10px;
}

.fas {
  color: red;
  font-size: 14px;
}

.taskCompleted,
.toComplete {
  font-size: 15px;
  margin: 0px;
  display: inline-block;
}

.toComplete {
  margin-right: 3px;
}

.toCompleteNumber {
  width: 30px;
  height: 20px;
  text-align: center;
  font-size: 15px;
  margin-bottom: 0px;
}

.toComplete .toCompleteNumber {
  display: block;
}

#delBtn {
  float: right;
  margin-top: 3px;
  margin-right: 6px;
}

.date {
  width: 40px;
  height: 20px;
  text-align: center;
  font-size: 15px;
  margin-bottom: 0px;
}

#stage {
  font-size: 15px;
}

.visible {
  visibility: hidden;
}
</style>
