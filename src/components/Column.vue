<template>
  <div
    v-bind:style="styleObject"
    :id="id"
    :name="name"
    :nrOfTasks="nrOfTasks"
    class="column"
    @dragover.prevent
    @drop.prevent="drop"
    @drop="dropped"
  >
    <h2>{{ name }}</h2>
    <br />
    Maximum number of tasks: {{ maxTasks }}
    <div id="nrOfTasks"> Number of tasks: {{ nrOfTasks }}</div>
    <div class="buttoncontainer">
      <button @click="increaseCounter">+</button>
      <button @click="decreaseCounter">-</button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["id", "name", "nrOfTasks"],
  data() {
    return {
      maxTasks: 5,
      counter: 0,
      styleObject: {
        background: "",
      },
    };
  },

  methods: {
    drop: (e) => {
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      task.style.display = "block";
      e.target.appendChild(task);
    },

    dropped(e) {
      console.log(e.target);
      this.$emit("dropped");
    },
  
    increaseCounter() {
      if (this.counter < this.maxTasks) {
        this.counter += 1;
        document.getElementById("nrOfTasks").style.color = "";
      }
      if (this.counter == this.maxTasks) {
        this.counter = this.maxTasks;
        document.getElementById("nrOfTasks").style.color = "red";
      }
    },
    decreaseCounter() {
      if (this.counter > 0) {
        this.counter -= 1;
      }
      document.getElementById("nrOfTasks").style.color = "";
    },
  },
};
</script>
