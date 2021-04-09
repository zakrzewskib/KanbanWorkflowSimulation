<template>
  <div
    :id="id"
    :name="name"
    class="column"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <h2>{{ name }}</h2> <br>
    Number of tasks: {{ counter }}
    <div class="buttoncontainer">
      <button @click="increaseCounter">+</button>
      <button @click="decreaseCounter">-</button>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: ["id", "name"],
  data() {
    return {
      counter: 0,
      maxTasks: 5,
    };
  },

  methods: {
    drop: (e) => {
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      task.style.display = "block";
      e.target.appendChild(task);
    },
    increaseCounter() {
      if (this.counter >= this.maxTasks) {
        this.counter = this.maxTasks;
      } else {
        this.counter += 1;
      }
    },
    decreaseCounter() {
      if (this.counter > 0) {
        this.counter -= 1;
      }
    },
  },
};
</script>

