<template>
  <div :id="id" class="column" @dragover.prevent @drop.prevent="drop">
    <slot /> <!-- You can put the content inside and use it as a tag -->
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    drop: (e) => {
      const task_id = e.dataTransfer.getData("task_id");
      const task = document.getElementById(task_id);
      task.style.display = "block";
      e.target.appendChild(task);
    },
  },
};

// document.addEventListener("dragenter", function(event) {
//   // highlight potential drop target when the draggable element enters it
//   if (event.target.className == "column") {
//     event.target.style.background = "grey";
//   }

// }, false);


// document.addEventListener(
//   "dragleave",
//   function (event) {
//     if (event.target.className == "column") {
//       event.target.style.background = "";
//     }
//   },
//   false
// );

// document.addEventListener("drop", function(event) {
//   event.preventDefault();
//   if (event.target.className == "column") {
//     event.target.style.background = "";
//   }

// }, false);


</script>
