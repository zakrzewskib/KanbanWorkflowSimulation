<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <AddTask @add-task="addTask" />
    <br />
    <div class="row">
      <div class="col-3"></div>
      <div class="col-3"><h2>STAGE1</h2></div>
      <div class="col-3"><h2>STAGE2</h2></div>
      <div class="col-3"></div>
    </div>
    <main class="flexbox">
      <Column
        id="column-1"
        name="TODO"
        @dropped="dropped1"
        @left="left1"
        :nrOfTasks="counter1"
        :maximumNrOfTasks="maxTasks"
      >
        <Task
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :name="task.name"
          draggable="true"
        >
        </Task>
      </Column>
      <Column
        id="column-2"
        name="STAGE1"
        @dropped="dropped2"
        @left="left2"
        :nrOfTasks="counter2"
        :maximumNrOfTasks="maxTasks"
      >
      </Column>
      <Column
        id="column-3"
        name="STAGE2"
        @dropped="dropped3"
        @left="left3"
        :nrOfTasks="counter3"
        :maximumNrOfTasks="maxTasks"
      >
      </Column>
      <Column
        id="column-4"
        name="STAGE1"
        @dropped="dropped4"
        @left="left4"
        :nrOfTasks="counter4"
        :maximumNrOfTasks="maxTasks"
      >
      </Column>
      <Column
        id="column-5"
        name="STAGE2"
        @dropped="dropped5"
        @left="left5"
        :nrOfTasks="counter5"
        :maximumNrOfTasks="maxTasks"
      >
      </Column>
      <Column
        id="column-6"
        name="DONE"
        @dropped="dropped6"
        @left="left6"
        :nrOfTasks="counter6"
        :maximumNrOfTasks="maxTasks"
      >
      </Column>
    </main>
  </div>
</template>

<script>
import Column from "./components/Column";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

export default {
  data() {
    return {
      title: "Kanban Board Workflow Simulation",
      tasks: [
        // { id: Math.random(), name: "Normal task 1" },
        // { id: Math.random(), name: "Normal task 2" },
      ],
      maxTasks: 5,
      counter1: 0,
      counter2: 0,
      counter3: 0,
      counter4: 0,
      counter5: 0,
      counter6: 0,
    };
  },
  methods: {
    increaseCounter(counter, option, maxTasks) {
      // if (counter < maxTasks) {
        switch (option) {
          case 1:
            this.counter1++;
            break;
          case 2:
            this.counter2++;
            break;
          case 3:
            this.counter3++;
            break;
          case 4:
            this.counter4++;
            break;
          case 5:
            this.counter5++;
            break;
          case 6:
            this.counter6++;
            break;
          default:
            break;
        // }
        // document.getElementById("nrOfTasks").style.color = "";
      }
      if (counter >= maxTasks - 1) {
        // document.getElementById("nrOfTasks").style.color = "red";
      }
    },

    decreaseCounter(counter, option) {
      if (this.counter > 0) {
        switch (option) {
          case 1:
            this.counter1--;
            break;
          case 2:
            this.counter2--;
            break;
          case 3:
            this.counter3--;
            break;
          case 4:
            this.counter4--;
            break;
          case 5:
            this.counter5--;
            break;
          case 6:
            this.counter6--;
            break;
          default:
            break;
        }
      }
      // document.getElementById("nrOfTasks").style.color = "";
    },

    increaseTodoColumn() {
      this.increaseCounter(this.counter1, 1, this.maxTasks);
    },

    dropped1() {
      this.increaseTodoColumn();
    },
    dropped2() {
      this.increaseCounter(this.counter2, 2, this.maxTasks);
    },
    dropped3() {
      this.increaseCounter(this.counter3, 3, this.maxTasks);
    },
    dropped4() {
      this.increaseCounter(this.counter4, 4, this.maxTasks);
    },
    dropped5() {
      this.increaseCounter(this.counter5, 5, this.maxTasks);
    },
    dropped6() {
      this.increaseCounter(this.counter6, 6, this.maxTasks);
    },
    left1() {
      this.counter1--;
    },
    left2() {
      this.counter2--;
    },
    left3() {
      this.counter3--;
    },
    left4() {
      this.counter4--;
    },
    left5() {
      this.counter5--;
    },
    left6() {
      this.counter6--;
    },

    addTask(task) {
      // console.log(task.name);
      this.tasks.push({
        id: task.id,
        name: task.name,
      });
      this.increaseTodoColumn();
    },
  },
  name: "App",
  components: {
    Column,
    Task,
    AddTask,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import "./styles/flexboxstyles.css";
@import "./styles/taskstyles.css";
@import "./styles/columnstyles.css";
</style>
