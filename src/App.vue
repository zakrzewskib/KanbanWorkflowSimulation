<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <div>
      <AddTask @add-task="addTask" />
      <button v-on:click="changeMemebers" id="changeMemeberGlobal">Change current member</button>
    </div>

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
            v-model="maxTasks[0]"
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
          <input class="maxTasksInput" v-model="maxTasks[1]" />
        </div>
        <div id="col2counter">Number of tasks: {{ counter2 }}</div>
      </Column>

      <Column id="column-3" name="STAGE2" @dropped="dropped" @left="left3">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[2]" />
        </div>
        <div id="col3counter">Number of tasks: {{ counter3 }}</div>
      </Column>

      <Column id="column-4" name="STAGE1" @dropped="dropped" @left="left4">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[3]" />
        </div>
        <div id="col4counter">Number of tasks: {{ counter4 }}</div>
      </Column>

      <Column id="column-5" name="STAGE2" @dropped="dropped" @left="left5">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[4]" />
        </div>
        <div id="col5counter">Number of tasks: {{ counter5 }}</div>
      </Column>
      <Column id="column-6" name="DONE" @dropped="dropped" @left="left6">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[5]" />
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
        {
          id: Math.random(),
          name: "Normal task",
          urgent: false,
          fixedDate: false,
        },
        {
          id: Math.random(),
          name: "Urgent task",
          urgent: true,
          fixedDate: false,
        },
      ],
      counters: [0, 0, 0, 0, 0, 0],
      maxTasks: [3, 3, 3, 3, 3, 20],
      counter1: 0,
      counter2: 0,
      counter3: 0,
      counter4: 0,
      counter5: 0,
      counter6: 0,
      currentLeft: 0,

      currentMemeber: 1,
      numberOfMemebers: 4,
    };
  },

  methods: {
    changeStyleIfMoreThanMax(counter, option, maxTasks) {
      var elementId = "col".concat(option, "counter");
      console.log(elementId);
      if (counter >= maxTasks) {
        document.getElementById(elementId).style.color = "red";
      } else {
        document.getElementById(elementId).style.color = "";
      }
    },

    decreaseLeftColumn(id) {
      this.counters[id - 1]--;
      this.udpateCounters();
      this.changeStyleIfMoreThanMax(
        this.counters[id - 1],
        id,
        this.maxTasks[id - 1]
      );
    },

    increaseTodoColumn() {
      this.counters[0]++;
      this.changeStyleIfMoreThanMax(this.counters[0], 1, this.maxTasks[0]);
      this.udpateCounters();
    },

    udpateCounters() {
      this.counter1 = this.counters[0];
      this.counter2 = this.counters[1];
      this.counter3 = this.counters[2];
      this.counter4 = this.counters[3];
      this.counter5 = this.counters[4];
      this.counter6 = this.counters[5];
    },

    dropped(id) {
      var idToInt = parseInt(id, 10);
      this.decreaseLeftColumn(this.currentLeft);
      this.counters[idToInt - 1]++;
      this.udpateCounters();
      this.changeStyleIfMoreThanMax(
        this.counters[idToInt - 1],
        idToInt,
        this.maxTasks[idToInt - 1]
      );
    },

    left1() {
      this.currentLeft = 1;
    },
    left2() {
      this.currentLeft = 2;
    },
    left3() {
      this.currentLeft = 3;
    },
    left4() {
      this.currentLeft = 4;
    },
    left5() {
      this.currentLeft = 5;
    },
    left6() {
      this.currentLeft = 6;
    },

    addTask(task) {
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
    changeMemebers() {
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
          color = "DeepSkyBlue";
          break;
        case 3:
          color = "green";
          break;
        case 4:
          color = "yellow";
          break;
      }
      document.getElementById("changeMemeberGlobal").style.background = color;
    }
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

#changeMemeberGlobal {
  background: red;
}
</style>
