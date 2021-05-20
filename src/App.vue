<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-4">
        <div>
          <div>
            <div id="addNewTask">
              <AddTask
                class="button8"
                @add-task="addTask"
                :normalProb="normalProb"
                :urgentProb="urgentProb"
                :fixedDateProb="fixedDateProb"
              />
            </div>

            <button v-on:click="nextDay" id="nextDay" class="button8">
              Next day
            </button>
            <div>
              Select current developer
              <br />
              <em
                >(use his productivity points - they are printed on dices
                images)</em
              >
              <div>
                <button id="developer1" v-on:click="changeToDeveloper1">
                  1
                </button>
                <button id="developer2" v-on:click="changeToDeveloper2">
                  2
                </button>
                <button id="developer3" v-on:click="changeToDeveloper3">
                  3
                </button>
                <button id="developer4" v-on:click="changeToDeveloper4">
                  4
                </button>
                <button id="developer5" v-on:click="changeToDeveloper5">
                  5
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <Dices
          :dice1="dice1"
          :dice2="dice2"
          :dice3="dice3"
          :dice4="dice4"
          :dice5="dice5"
          :dicesSize="dicesSize"
        ></Dices>

        <div class="row">
          <div class="col-6" id="numberOfDays">
            <div id="currentDay">Number of days: {{ currentDay }}</div>
            <div id="currentDate">
              Current date (dd/mm/yyyy):&#10;{{
                currentDate.toLocaleDateString()
              }}
            </div>
          </div>

          <div class="col-6" id="tasksBlockedDiv">
            <div id="tasksBlocked">
              Tasks blocked: [ {{ tasksBlocked.toString() }} ]
            </div>
            <em>
              (To unblock one task, you should use some of productivity points
              in current task)</em
            >
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="probabilityDiv">
          <a>To block probability (in %): </a>
          <input class="blockersP" v-model="blockedProbability" />
        </div>

        <br>

        <div class="probabilityDiv">
          <a>Normal task probability (in %): </a>
          <input class="blockersP" v-model="normalProb" />
          <br />
          <a>Urgent task probability (in %): </a>
          <input class="blockersP" v-model="urgentProb" />
          <br />
          <a>Fixed date task probability (in %): </a>
          <input class="blockersP" v-model="fixedDateProb" />
          <br>
          <em>Sum of task type probabilities should sum up to 100%</em>
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
      <ColumnContainer id="container-1" name="TODO">
        <div>
          Max number of tasks:
          <input
            class="maxTasksInput"
            v-model="maxTasks[0]"
            placeholder="maxTasks1"
          />
        </div>
        <div id="col1counter">Number of tasks: {{ counter1 }}</div>
        <Column id="column-1" name="TODO" @dropped="dropped" @left="left1">
          <Task
            v-for="task in tasks"
            :key="task.id"
            :id="task.id"
            :name="task.name"
            :urgent="task.urgent"
            :fixedDate="task.fixedDate"
            :member="currentMemeber"
            :blocked="task.blocked"
            :nr="task.nr"
            :draggable="!task.blocked"
            @delete-task="deleteTask"
            @unblocked-task="unblockTask"
          >
          </Task>
        </Column>
      </ColumnContainer>

      <ColumnContainer id="container-2" name="STAGE1">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[1]" />
        </div>
        <div id="col2counter">Number of tasks: {{ counter2 }}</div>
        <Column id="column-2" name="STAGE1" @dropped="dropped" @left="left2">
        </Column>
      </ColumnContainer>

      <ColumnContainer id="container-3" name="STAGE2">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[2]" />
        </div>
        <div id="col3counter">Number of tasks: {{ counter3 }}</div>
        <Column id="column-3" name="STAGE2" @dropped="dropped" @left="left3">
        </Column>
      </ColumnContainer>

      <ColumnContainer id="container-4" name="STAGE1">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[3]" />
        </div>
        <div id="col4counter">Number of tasks: {{ counter4 }}</div>
        <Column id="column-4" name="STAGE1" @dropped="dropped" @left="left4">
        </Column>
      </ColumnContainer>

      <ColumnContainer id="container-5" name="STAGE2">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[4]" />
        </div>
        <div id="col5counter">Number of tasks: {{ counter5 }}</div>
        <Column id="column-5" name="STAGE2" @dropped="dropped" @left="left5">
        </Column>
      </ColumnContainer>

      <ColumnContainer id="container-6" name="DONE">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[5]" />
        </div>
        <div id="col6counter">Number of tasks: {{ counter6 }}</div>
        <Column id="column-6" name="DONE" @dropped="dropped" @left="left6">
        </Column>
      </ColumnContainer>
    </main>
  </div>
</template>

<script>
import Column from "./components/Column";
import ColumnContainer from "./components/ColumnContainer";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import Dices from "./components/Dices";

export default {
  data() {
    return {
      title: "Kanban Board Workflow Simulation",
      tasks: [],
      counters: [0, 0, 0, 0, 0, 0],
      maxTasks: [8, 4, 4, 3, 3, 20],
      counter1: 0,
      counter2: 0,
      counter3: 0,
      counter4: 0,
      counter5: 0,
      counter6: 0,
      currentLeft: 0,

      currentMemeber: 1,
      numberOfMemebers: 5,

      colors: [
        "LightCoral",
        "yellow",
        "DarkSeaGreen",
        "CornflowerBlue",
        "MediumPurple",
      ],

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
      tasksBlocked: [],
      currentDate: new Date(),
      currentDay: 0,

      blockedProbability: 20,
      normalProb: 50,
      urgentProb: 25,
      fixedDateProb: 25,
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
        nr: task.nr,
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

    resetStyleOnDevelopers(one, two, three, four, five) {
      if (one) {
        document.getElementById("developer1").style.border = "";
      }
      if (two) {
        document.getElementById("developer2").style.border = "";
      }
      if (three) {
        document.getElementById("developer3").style.border = "";
      }
      if (four) {
        document.getElementById("developer4").style.border = "";
      }
      if (five) {
        document.getElementById("developer5").style.border = "";
      }
    },

    changeToDeveloper1() {
      this.currentMemeber = 1;
      document.getElementById("developer1").style.border = "solid black 4px";
      this.resetStyleOnDevelopers(false, true, true, true, true);
    },

    changeToDeveloper2() {
      this.currentMemeber = 2;
      document.getElementById("developer2").style.border = "solid black 4px";
      this.resetStyleOnDevelopers(true, false, true, true, true);
    },

    changeToDeveloper3() {
      this.currentMemeber = 3;
      document.getElementById("developer3").style.border = "solid black 4px";
      this.resetStyleOnDevelopers(true, true, false, true, true);
    },

    changeToDeveloper4() {
      this.currentMemeber = 4;
      document.getElementById("developer4").style.border = "solid black 4px";
      this.resetStyleOnDevelopers(true, true, true, false, true);
    },

    changeToDeveloper5() {
      this.currentMemeber = 5;
      document.getElementById("developer5").style.border = "solid black 4px";
      this.resetStyleOnDevelopers(true, true, true, true, false);
    },

    changeProductivity() {
      var i;
      var random = [];
      for (i = 0; i < this.numberOfMemebers; i++) {
        random[i] = Math.floor(Math.random() * this.numberOfMemebers);
      }
      this.dice1.imgsource = this.dicesRed[random[0]].imgsource;
      this.dice2.imgsource = this.dicesYellow[random[1]].imgsource;
      this.dice3.imgsource = this.dicesGreen[random[2]].imgsource;
      this.dice4.imgsource = this.dicesBlue[random[3]].imgsource;
      this.dice5.imgsource = this.dicesPurple[random[4]].imgsource;
    },

    setBlockers() {
      var tasksBlocked = [];
      var j = 0;
      let index = 0;
      for (let task of this.tasks) {
        let random = Math.floor(Math.random() * 100);
        if (random <= this.blockedProbability && !task.blocked) {
          this.$set(this.tasks, index, {
            id: task.id,
            name: task.name,
            urgent: task.urgent,
            fixedDate: task.fixedDate,
            nr: task.nr,
            blocked: true,
          });
          tasksBlocked[j] = task.nr;
          j++;
        }
        index++;
      }
      this.tasksBlocked = tasksBlocked;
    },
    nextDay() {
      this.currentDay++;
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      this.changeProductivity();
      this.setBlockers();
    },
    deleteTask(nr) {
      this.tasks = this.tasks.filter((task) => task.nr !== nr);
    },

    unblockTask(nr) {
      let index = 0;
      for (let task of this.tasks) {
        if (task.nr == nr) {
          this.$set(this.tasks, index, {
            id: task.id,
            name: task.name,
            urgent: task.urgent,
            fixedDate: task.fixedDate,
            nr: task.nr,
            blocked: false,
          });
        }
        index++;
      }
    },
  },

  name: "App",
  components: {
    Column,
    Task,
    AddTask,
    ColumnContainer,
    Dices,
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
  font-size: 17px;
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
  width: 100%;
  height: 100%;
}

.columnContainer {
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  max-width: 600px;
  margin: 2px;
  border: 5px solid black;
  padding: 15px;
}

#container-2,
#container-4 {
  margin-right: 0px;
  border-right: 1px solid black;
}

#container-3,
#container-5 {
  margin-left: 0px;
  border-left: 1px solid black;
}

.maxTasksInput {
  width: 14%;
  text-align: center;
}

#changeMemeberGlobal {
  background: red;
}

#nextDay,
#addNewTask,
#changeMemeberGlobal {
  display: inline-block;
  margin: 5px;
}

h1 {
  font-size: 1.8rem;
}

h2 {
  font-size: 1.8rem;
}

h3 {
  font-size: 1.5rem;
}

#middleColumn {
  overflow: hidden;
}

#numberOfDays {
  float: left;
}

#tasksBlockedDiv {
  text-align: center;
}

#tasksBlocked {
  color: red;
  font-weight: bold;
}

[id^="developer"] {
  margin: 2px;
}

#developer1 {
  background-color: LightCoral;
}

#developer2 {
  background-color: yellow;
}

#developer3 {
  background-color: DarkSeaGreen;
}

#developer4 {
  background-color: CornflowerBlue;
}

#developer5 {
  background-color: MediumPurple;
}
img {
  margin-right: 5px;
}

.blockersP {
  width: 40px;
  margin-right: 10px;
}

.button8:active {
  background-color: #bebebe;
}

.probabilityDiv {
  text-align: left;
  margin-left: 40px;
}

div {
  white-space: pre-wrap;
}
</style>
