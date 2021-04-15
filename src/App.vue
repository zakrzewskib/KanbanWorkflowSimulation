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
        :nrOfTasks="columnCounters[0]"
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
        :nrOfTasks="columnCounters[1]"
      >
      {{columnCounters[0]}}
      </Column>
      <Column
        id="column-3"
        name="STAGE2"
        @dropped="dropped3"
        :nrOfTasks="columnCounters[2]"
      >
      </Column>
      <Column
        id="column-4"
        name="STAGE1"
        @dropped="dropped4"
        :nrOfTasks="columnCounters[3]"
      >
      </Column>
      <Column
        id="column-5"
        name="STAGE2"
        @dropped="dropped5"
        :nrOfTasks="columnCounters[4]"
      >
      </Column>
      <Column
        id="column-6"
        name="DONE"
        @dropped="dropped6"
        :nrOfTasks="columnCounters[5]"
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
      columnCounters: [0, 0, 0, 0, 0, 0],
    };
  },
  methods: {
    dropped1() {
      console.log(this.columnCounters[0]);
      this.columnCounters[0]++;
    },
    dropped2() {
      this.columnCounters[1]++;
    },
    dropped3() {
      this.columnCounters[2]++;
    },
    dropped4() {
      this.columnCounters[3]++;
    },
    dropped5() {
      this.columnCounters[4]++;
    },
    dropped6() {
      this.columnCounters[5]++;
    },
    left2() {
      this.columnCounters[1]--;
    },

    addTask(task) {
      console.log(task.name);
      this.tasks.push({
        id: task.id,
        name: task.name,
      });
      this.columnCounters[0]++;
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
