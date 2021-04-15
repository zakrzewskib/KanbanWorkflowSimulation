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
      <Column id="column-1" name="TODO" @dropped="dropped1" @left="left1">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks1"
            placeholder="maxTasks1"
          />
        </div>
        <div id="col1counter">Number of tasks: {{ counter1 }}</div>
        <Task
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :name="task.name"
          :urgent="task.urgent"
          :fixedDate="task.fixedDate"
          draggable="true"
        >
        </Task>
      </Column>

      <Column id="column-2" name="STAGE1" @dropped="dropped2" @left="left2">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks2"
          />
        </div>
        <div id="col2counter">Number of tasks: {{ counter2 }}</div>
      </Column>

      <Column id="column-3" name="STAGE2" @dropped="dropped3" @left="left3">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks3"
          />
        </div>
        <div id="col3counter">Number of tasks: {{ counter3 }}</div>
      </Column>

      <Column id="column-4" name="STAGE1" @dropped="dropped4" @left="left4">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks4"
          />
        </div>
        <div id="col4counter">Number of tasks: {{ counter4 }}</div>
      </Column>

      <Column id="column-5" name="STAGE2" @dropped="dropped5" @left="left5">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks5"
          />
        </div>
        <div id="col5counter">Number of tasks: {{ counter5 }}</div>
      </Column>
      <Column id="column-6" name="DONE" @dropped="dropped6" @left="left6">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks6"
          />
        </div>
        <div id="col6counter">Number of tasks: {{ counter6 }}</div>
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
      maxTasks1: 3,
      maxTasks2: 3,
      maxTasks3: 3,
      maxTasks4: 3,
      maxTasks5: 3,
      maxTasks6: 20,
    };
  },

  methods: {
    changeStyleIfMoreThanMax(counter, option, maxTasks) {
      var elementId = "col".concat(option, "counter");
      console.log(elementId, counter, maxTasks)
      if (counter >= maxTasks) {
        document.getElementById(elementId).style.color = "red";
      } else {
        document.getElementById(elementId).style.color = "";
      }
    },

    increaseCounter(counter, option, maxTasks) {
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
      }

      this.changeStyleIfMoreThanMax(counter+1, option, maxTasks);
    },

    decreaseCounter(counter, option, maxTasks) {
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
      this.changeStyleIfMoreThanMax(counter-1, option, maxTasks);
    },

    increaseTodoColumn() {
      this.increaseCounter(this.counter1, 1, this.maxTasks1);
    },

    dropped1() {
      this.increaseTodoColumn();
    },
    dropped2() {
      this.increaseCounter(this.counter2, 2, this.maxTasks2);
    },
    dropped3() {
      this.increaseCounter(this.counter3, 3, this.maxTasks3);
    },
    dropped4() {
      this.increaseCounter(this.counter4, 4, this.maxTasks4);
    },
    dropped5() {
      this.increaseCounter(this.counter5, 5, this.maxTasks5);
    },
    dropped6() {
      this.increaseCounter(this.counter6, 6, this.maxTasks6);
    },
    left1() {
      this.decreaseCounter(this.counter1, 1, this.maxTasks1);
    },
    left2() {
      this.decreaseCounter(this.counter2, 2, this.maxTasks2);
    },
    left3() {
      this.decreaseCounter(this.counter3, 3, this.maxTasks3);
    },
    left4() {
      this.decreaseCounter(this.counter4, 4, this.maxTasks4);
    },
    left5() {
      this.decreaseCounter(this.counter5, 5, this.maxTasks5);
    },
    left6() {
      this.decreaseCounter(this.counter6, 6, this.maxTasks6);
    },

    addTask(task) {
      // console.log(task.name);
      this.tasks.push({
        id: task.id,
        name: task.name,
        urgent: task.urgent,
        fixedDate: task.fixedDate,
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
@import "./styles/columnstyles.css";
</style>
