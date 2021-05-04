<template>
  <div class="columnContainer" :name="name">
    <h2>{{ name }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["name"],
};
</script>
