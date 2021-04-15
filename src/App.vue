<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <!-- <button @click="addItem">Add new task</button> -->
    <AddTask @add-task="addTask" />
    <br />
    <div class="row">
      <div class="col-3"></div>
      <div class="col-3"><h2>STAGE1</h2></div>
      <div class="col-3"><h2>STAGE2</h2></div>
      <div class="col-3"></div>
    </div>
    <main class="flexbox">
      <Column id="column-1" name="TODO">
        <Task
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :name="task.name"
          draggable="true"
        >
        </Task>
      </Column>
      <Column id="column-2" name="STAGE1" :numberOfTasks="numberOfTasks" @dropped="dropped">
      {{counterCol2}}
      </Column>
      <Column id="column-3" name="STAGE2"> </Column>
      <Column id="column-4" name="STAGE1"> </Column>
      <Column id="column-5" name="STAGE2"> </Column>
      <Column id="column-6" name="DONE"> </Column>
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
        { id: Math.random(), name: "Normal task 1" },
        { id: Math.random(), name: "Normal task 2" },
      ],
      numberOfTasks: 0,
      counterCol2: 0,
    };
  },
  methods: {
    dropped() {
      this.counterCol2++;
    },
    
    addTask(task) {
      console.log(task.name);
      this.tasks.push({
        id: task.id,
        name: task.name,
      });
      this.numberOfTasks++;
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
