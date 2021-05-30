<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-4">
        <div>
          <div>
            <div id="addNewTask">
              <AddTask
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
                >(use his productivity points - they are printed on the dices
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

        <div class="narration">
          {{ currentNarration }}
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
          </div>

          <div class="col-6" id="tasksBlockedDiv">
            <div id="tasksBlocked">
              Tasks blocked in current day: [ {{ tasksBlocked.toString() }} ]
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

        <br />

        <div class="probabilityDiv">
          <p>Task type probabilities:</p>
          <a>Normal task probability (in %): </a>
          <input class="blockersP" v-model="normalProb" />
          <br />
          <a>Urgent task probability (in %): </a>
          <input class="blockersP" v-model="urgentProb" />
          <br />
          <a>Fixed date task probability (in %): </a>
          <input class="blockersP" v-model="fixedDateProb" />
          <br />
          <em>(Sum of task type probabilities should sum up to 100%)</em>
        </div>
      </div>
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

      <ColumnContainer id="container-3" name="READY FOR STAGE 2">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[2]" />
        </div>
        <div id="col3counter">Number of tasks: {{ counter3 }}</div>
        <Column id="column-3" name="STAGE2" @dropped="dropped" @left="left3">
        </Column>
      </ColumnContainer>

      <ColumnContainer id="container-4" name="STAGE2">
        <div>
          Max number of tasks:
          <input class="maxTasksInput" v-model="maxTasks[3]" />
        </div>
        <div id="col4counter">Number of tasks: {{ counter4 }}</div>
        <Column id="column-4" name="STAGE2" @dropped="dropped" @left="left4">
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
      currentNarrationNumber: 0,
      currentNarration:
        "Dzień 0. \nRozpocznijcie symulację klikając przycisk 'Next Day'.",
      narrations: [
        "Dzień 0. \nRozpocznijcie symulację klikając przycisk 'Next Day'",
        "Dzień 1: \nRozpoczynacie pracę w nowym zespole. Zdefiniujcie zadania standardowe i zacznijcie nad nimi pracować.",
        "Dzień 2: \n Nie zapomnijcie o wypełnieniu wszystkich pól w skrypcie.",
        "Dzień 3: \nSystem płatności uległ awarii. Z każdą godziną firma traci duże pieniądze. Zdefiniujcie 4 zadania pilne (Expedite) i natychmiast zacznijcie nad nimi pracować. Ich ukończenie ma najwyższy priorytet.",
        "Dzień 4: \nSpecjaliści od marketingu wymyślili promocję z okazji „Dnia Słonecznika”. Zdefiniujcie 3 zadania z ustaloną datą (Fixed Date). By przynieść wartość dla naszej organizacji muszą być ukończone najpóźniej 10 dnia. Ich wcześniejsze ukończenie nie jest ważne bo i tak promocja nie zostanie upubliczniona do końca 10 dnia.",
        "Dzień 5: \nTo ostatni dzień w tygodniu. Pamiętajcie by po zakończeniu pracy podsumować tydzień tak jak zostało to opisane w skrypcie.",
        "Dzień 6: \nNowy tydzień, nowe możliwości. Powodzenia.",
        "Dzień 7: \nDobra robota, pracujcie dalej.",
        "Dzień 8: \nJeden z menedżerów wpadł na pomysł dodania nowej funkcji do naszego produktu. Wymagałoby to zrealizowania 4 standardowych zadań (wszystkie muszą być ukończone by nowa funkcja działała). Prosi was o podanie szacowanego czasu zrealizowania tych zadań. Szacowany dzień ukończenia tych 4 zadań zapiszcie w skrypcie.",
        "Dzień 9: \nZostały już tylko dwa dni na ukończenie zadań z ustaloną datą.",
        "Dzień 10: \nOstatni dzień symulacji. Dokończcie pracę i podsumujcie ją w skrypcie.",
      ],

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
      normalProb: 100,
      urgentProb: 0,
      fixedDateProb: 0,
    };
  },

  methods: {
    changeStyleIfMoreThanMax(counter, option, maxTasks) {
      const elementId = "col".concat(option, "counter");
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

    dropped(id, task_id) {
      const idToInt = parseInt(id);
      let done = false;
      let todo = false;
      let readyForStage2 = false;

      if (id == 6) {
        done = true;
      }
      if (id == 1) {
        todo = true;
      }
      if (id == 3) {
        readyForStage2 = true;
      }

      let index = 0;
      for (let task of this.tasks) {
        if (task.id == task_id) {
          this.$set(this.tasks, index, {
            id: task.id,
            name: task.name,
            urgent: task.urgent,
            fixedDate: task.fixedDate,
            nr: task.nr,
            blocked: task.blocked,
            done: done,
            todo: todo,
            readyForStage2: readyForStage2,
          });
        }
        index++;
      }
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
        done: task.done,
        todo: task.todo,
        readyForStage2: task.readyForStage2,
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
      let random = [];
      for (let i = 0; i < this.numberOfMemebers; i++) {
        random[i] = Math.floor(Math.random() * this.numberOfMemebers);
      }
      this.dice1.imgsource = this.dicesRed[random[0]].imgsource;
      this.dice2.imgsource = this.dicesYellow[random[1]].imgsource;
      this.dice3.imgsource = this.dicesGreen[random[2]].imgsource;
      this.dice4.imgsource = this.dicesBlue[random[3]].imgsource;
      this.dice5.imgsource = this.dicesPurple[random[4]].imgsource;
    },

    setBlockers() {
      let tasksBlocked = [];
      let j = 0;
      let index = 0;
      for (let task of this.tasks) {
        let random = Math.floor(Math.random() * 100);
        if (
          random <= parseInt(this.blockedProbability) &&
          !task.blocked &&
          !task.done &&
          !task.todo &&
          !task.readyForStage2
        ) {
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
      this.nextNarration();
    },

    deleteTask(nr) {
      if (confirm("Are you sure you want to delete this task?")) {
        this.tasks = this.tasks.filter((task) => task.nr !== nr);
      }
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

    nextNarration() {
      this.currentNarrationNumber++;
      if (this.currentNarrationNumber > 10) {
        this.currentNarration =
          "Dzień " + this.currentNarrationNumber + ": \n" + "...";
      } else {
        this.currentNarration = this.narrations[this.currentNarrationNumber];
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

#container-2 {
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

.narration {
  border: 2px black solid;
  margin-left: 20px;
  text-align: center;
}

#currentDay {
  font-weight: bold;
}
</style>
