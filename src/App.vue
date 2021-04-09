<template>
  <div id="app">
    <h2>{{ title }}</h2>
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
      <Column id="column-2">
        <div class="columnsInside">
          <Column id="column-2-1"> </Column>
          <Column id="column-2-2"> </Column>
        </div>
      </Column>
      <Column id="column-3">
        <div class="columnsInside">
          <Column id="column-3-1"> </Column>
          <Column id="column-3-2"> </Column>
        </div>
      </Column>
      <Column id="column-4"> </Column>
    </main>
  </div>
</template>

<script>
import Column from "./components/Column";
import Task from "./components/Task";

export default {
  data() {
    return {
      title: "Kanban Board Workflow Simulation",
      tasks: [
        { id: Math.random(), name: "Zwykły task 1" },
        { id: Math.random(), name: "Zwykły task 2" },
      ],
    };
  },
  name: "App",
  components: {
    Column,
    Task,
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
