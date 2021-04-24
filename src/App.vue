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
      <Column id="column-1" name="TODO" @dropped="dropped" @left="left1">
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
          @change-author="changeMember"
        >
        </Task>
      </Column>

      <Column id="column-2" name="STAGE1" @dropped="dropped" @left="left2">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks2" />
        </div>
        <div id="col2counter">Number of tasks: {{ counter2 }}</div>
      </Column>

      <Column id="column-3" name="STAGE2" @dropped="dropped" @left="left3">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks3" />
        </div>
        <div id="col3counter">Number of tasks: {{ counter3 }}</div>
      </Column>

      <Column id="column-4" name="STAGE1" @dropped="dropped" @left="left4">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks4" />
        </div>
        <div id="col4counter">Number of tasks: {{ counter4 }}</div>
      </Column>

      <Column id="column-5" name="STAGE2" @dropped="dropped" @left="left5">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks5" />
        </div>
        <div id="col5counter">Number of tasks: {{ counter5 }}</div>
      </Column>
      <Column id="column-6" name="DONE" @dropped="dropped" @left="left6">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks6" />
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
        // {
        //   id: Math.random(),
        //   name: "Normal task",
        //   urgent: false,
        //   fixedDate: false,
        // },
        // {
        //   id: Math.random(),
        //   name: "Urgent task",
        //   urgent: true,
        //   fixedDate: false,
        // },
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

      currentMemeber: 1,
      numberOfMemebers: 4,
      lastButton: "",

      currentLeft: 0,
    };
  },

  methods: {
    changeStyleIfMoreThanMax(counter, option, maxTasks) {
      var elementId = "col".concat(option, "counter");
      console.log(elementId, counter, maxTasks);
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

      this.changeStyleIfMoreThanMax(counter + 1, option, maxTasks);
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
      this.changeStyleIfMoreThanMax(counter - 1, option, maxTasks);
    },

    decreaseLeftColumn() {
      this.decreaseCounter(this.counter1, this.currentLeft, this.maxTasks1);
    },

    increaseTodoColumn() {
      this.increaseCounter(this.counter1, 1, this.maxTasks1);
    },

    dropped(id) {
      this.decreaseLeftColumn();
      var idToInt = id;
      switch (parseInt(idToInt, 10)) {
        case 1:
          this.increaseCounter(this.counter1, parseInt(idToInt, 10), this.maxTasks1);
          break;
        case 2:
          this.increaseCounter(this.counter2, parseInt(idToInt, 10), this.maxTasks2);
          break;
        case 3:
          this.increaseCounter(this.counter3, parseInt(idToInt, 10), this.maxTasks3);
          break;
        case 4:
          this.increaseCounter(this.counter4, parseInt(idToInt, 10), this.maxTasks4);
          break;
        case 5:
          this.increaseCounter(this.counter5, parseInt(idToInt, 10), this.maxTasks5);
          break;
        case 6:
          this.increaseCounter(this.counter6, parseInt(idToInt, 10), this.maxTasks6);
          break;
      }
    },
    
    left1() {
      this.currentLeft = 1;
      // this.decreaseCounter(this.counter1, 1, this.maxTasks1);
    },
    left2() {
      this.currentLeft = 2;
      // this.decreaseCounter(this.counter2, 2, this.maxTasks2);
    },
    left3() {
      this.currentLeft = 3;
      // this.decreaseCounter(this.counter3, 3, this.maxTasks3);
    },
    left4() {
      this.currentLeft = 4;
      // this.decreaseCounter(this.counter4, 4, this.maxTasks4);
    },
    left5() {
      this.currentLeft = 5;
      // this.decreaseCounter(this.counter5, 5, this.maxTasks5);
    },
    left6() {
      this.currentLeft = 6;
      // this.decreaseCounter(this.counter6, 6, this.maxTasks6);
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

    changeMember(e) {
      if (this.currentMemeber < this.numberOfMemebers) {
        this.currentMemeber++;
      } else {
        this.currentMemeber = 1;
      }

      var color;
      switch (this.currentMemeber) {
        case 1:
          color = "red";
          break;
        case 2:
          color = "blue";
          break;
        case 3:
          color = "green";
          break;
        case 4:
          color = "yellow";
          break;
      }

      e.target.style.background = color;
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
