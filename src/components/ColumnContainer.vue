<template>
  <div class="columnContainer" :name="name">
    <h3>{{ name }}</h3>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["name"],
};
</script>
