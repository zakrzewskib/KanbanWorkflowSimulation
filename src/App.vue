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
        :nrOfTasks="counter0"
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
        :nrOfTasks="counter1"
      >
      </Column>
      <Column
        id="column-3"
        name="STAGE2"
        @dropped="dropped3"
        :nrOfTasks="counter2"
      >
      </Column>
      <Column
        id="column-4"
        name="STAGE1"
        @dropped="dropped4"
        :nrOfTasks="counter3"
      >
      </Column>
      <Column
        id="column-5"
        name="STAGE2"
        @dropped="dropped5"
        :nrOfTasks="counter4"
      >
      </Column>
      <Column
        id="column-6"
        name="DONE"
        @dropped="dropped6"
        :nrOfTasks="counter5"
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
      counter0: 0,
      counter1: 0,
      counter2: 0,
      counter3: 0,
      counter4: 0,
      counter5: 0,
    };
  },
  methods: {
    dropped1() {
      this.counter0++;
    },
    dropped2() {
      this.counter1++;
    },
    dropped3() {
      this.counter2++;
    },
    dropped4() {
      this.counter3++;
    },
    dropped5() {
      this.counter4++;
    },
    dropped6() {
      this.counter5++;
    },
    left1() {
      this.counter0--;
    },

    addTask(task) {
      console.log(task.name);
      this.tasks.push({
        id: task.id,
        name: task.name,
      });
      this.counter0++;
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
