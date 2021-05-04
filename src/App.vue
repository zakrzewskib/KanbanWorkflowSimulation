<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <img
      :src="dice1.imgsource"
      :width="dicesSize"
      :height="dicesSize"
      alt="dice1"
    />
    <img
      :src="dice2.imgsource"
      :width="dicesSize"
      :height="dicesSize"
      alt="dice2"
    />
    <img
      :src="dice3.imgsource"
      :width="dicesSize"
      :height="dicesSize"
      alt="dice3"
    />
    <img
      :src="dice4.imgsource"
      :width="dicesSize"
      :height="dicesSize"
      alt="dice4"
    />
    <img
      :src="dice5.imgsource"
      :width="dicesSize"
      :height="dicesSize"
      alt="dice5"
    />
    <div>
      <div class="row">
        <div class="col-4">
          <div id="buttons">
            <button v-on:click="nextDay" id="nextDay">
              Next day
            </button>

            <div id="addNewTask">
              <AddTask @add-task="addTask" />
            </div>
          </div>

          <div id="numberOfDays">Number of days: {{ currentDay }}</div>
        </div>

        <div class="col-4">
          <div id="tasksToBlock">
            Tasks to block: {{ tasksToBlock }}
            <br />
            <em>
              (To unblock one task, you should use 4 productivity points)</em
            >
          </div>
        </div>
      </div>
    </div>

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
          :member="currentMemeber"
          :blocked="task.blocked"
          draggable="true"
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
      tasks: [],
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
      numberOfMemebers: 5,

      colors: ["red", "yellow", "green", "blue", "purple"],

      dicesRed: [
        {
          imgsource: require("./assets/dices/red/1.png"),
        },
        {
          imgsource: require("./assets/dices/red/2.png"),
        },
        {
          imgsource: require("./assets/dices/red/3.png"),
        },
        {
          imgsource: require("./assets/dices/red/4.png"),
        },
        {
          imgsource: require("./assets/dices/red/5.png"),
        },
      ],
      dicesYellow: [
        {
          imgsource: require("./assets/dices/yellow/1.png"),
        },
        {
          imgsource: require("./assets/dices/yellow/2.png"),
        },
        {
          imgsource: require("./assets/dices/yellow/3.png"),
        },
        {
          imgsource: require("./assets/dices/yellow/4.png"),
        },
        {
          imgsource: require("./assets/dices/yellow/5.png"),
        },
      ],
      dicesGreen: [
        {
          imgsource: require("./assets/dices/green/1.png"),
        },
        {
          imgsource: require("./assets/dices/green/2.png"),
        },
        {
          imgsource: require("./assets/dices/green/3.png"),
        },
        {
          imgsource: require("./assets/dices/green/4.png"),
        },
        {
          imgsource: require("./assets/dices/green/5.png"),
        },
      ],
      dicesBlue: [
        {
          imgsource: require("./assets/dices/blue/1.png"),
        },
        {
          imgsource: require("./assets/dices/blue/2.png"),
        },
        {
          imgsource: require("./assets/dices/blue/3.png"),
        },
        {
          imgsource: require("./assets/dices/blue/4.png"),
        },
        {
          imgsource: require("./assets/dices/blue/5.png"),
        },
      ],
      dicesPurple: [
        {
          imgsource: require("./assets/dices/purple/1.png"),
        },
        {
          imgsource: require("./assets/dices/purple/2.png"),
        },
        {
          imgsource: require("./assets/dices/purple/3.png"),
        },
        {
          imgsource: require("./assets/dices/purple/4.png"),
        },
        {
          imgsource: require("./assets/dices/purple/5.png"),
        },
      ],
      dice1: {
        imgsource: require("./assets/dices/red/1.png"),
      },
      dice2: {
        imgsource: require("./assets/dices/yellow/2.png"),
      },
      dice3: {
        imgsource: require("./assets/dices/green/3.png"),
      },
      dice4: {
        imgsource: require("./assets/dices/blue/4.png"),
      },
      dice5: {
        imgsource: require("./assets/dices/purple/5.png"),
      },

      dicesSize: 60,
      tasksToBlock: [],
      currentDate: new Date(),
      currentDay: 0,
    };
  },

  methods: {
    changeStyleIfMoreThanMax(counter, option, maxTasks) {
      var elementId = "col".concat(option, "counter");
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
        blocked: false,
      });
      this.increaseTodoColumn();
    },

    changeMemebers() {
      if (this.currentMemeber < this.numberOfMemebers) {
        this.currentMemeber++;
      } else {
        this.currentMemeber = 1;
      }
      document.getElementById(
        "changeMemeberGlobal"
      ).style.background = this.colors[this.currentMemeber - 1];
    },

    changeProductivity() {
      var i;
      var random = [];
      for (i = 0; i < this.numberOfMemebers; i++) {
        random[i] = Math.floor(Math.random() * (this.numberOfMemebers - 1));
      }
      this.dice1.imgsource = this.dicesRed[random[0]].imgsource;
      this.dice2.imgsource = this.dicesYellow[random[1]].imgsource;
      this.dice3.imgsource = this.dicesGreen[random[2]].imgsource;
      this.dice4.imgsource = this.dicesBlue[random[3]].imgsource;
      this.dice5.imgsource = this.dicesPurple[random[4]].imgsource;
    },

    setBlockers() {
      var toBlock = [];
      var j = 0;
      for (var i = 0; i < this.tasks.length; i++) {
        var random = Math.floor(Math.random() * 100);
        if (random <= 20 && this.tasks[i].blocked == false) {
          toBlock[j] = Math.round(this.tasks[i].id * 100);
          j++;
        }
      }
      this.tasksToBlock = toBlock;
    },

    nextDay() {
      this.currentDay++;
      this.changeProductivity();
      this.setBlockers();
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
  margin-top: 20px;
}

.flexbox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  min-height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  padding: 15px;
}

.flexbox .column {
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  max-width: 600px;
  margin: 2px;
  border: 5px solid black;
  padding: 15px;
}

#column-2,
#column-4 {
  margin-right: 0px;
  border-right: 1px solid black;
}

#column-3,
#column-5 {
  margin-left: 0px;
  border-left: 1px solid black;
}

.maxTasksInput {
  width: 12%;
}

#changeMemeberGlobal {
  background: red;
}

#nextDay,
#addNewTask {
  display: inline-block;
}

h1 {
  font-size: 1.8rem;
}

h2 {
  font-size: 1.5rem;
}

#numberOfDays,
#tasksToBlock {
  font-size: 17px;
}
</style>
