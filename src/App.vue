<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <main class="flexbox">
      <Column id="column-1">
        <Task
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :name="task.name"
          draggable="true"
        >
        </Task>
      </Column>
      <Column id="column-2"> </Column>
      <Column id="column-3"> </Column>
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
        { id: Math.random(), name: "Zwykły task" },
        { id: Math.random(), name: "Zwykły task" },
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

.flexbox {
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 1400px;
  height: 100vh;

  overflow: hidden;
  margin: 0 auto;
  padding: 15px;
}

.flexbox .column {
  display: flex;
  flex-direction: column;

  color: black;

  width: 100%;
  max-width: 400px;
  margin: 10px;
  border: 5px solid black;

  padding: 15px;
}

.flexbox .column .task {
  padding: 15px 25px;
  cursor: pointer;
  margin-bottom: 15px;
  border: 2px solid black;
  /* border-radius: 10px; */
  /* background-color: red; */
}
</style>
