<template>
  <div
    :dice1="dice1"
    :dice2="dice2"
    :dice3="dice3"
    :dice4="dice4"
    :dice5="dice5"
    :dicesSize="dicesSize"
  >
    <strong id="productivityPoints">Productivity points (1-5): </strong>
    <br>
    <em> Use them to fill productivity points in each task </em>
    <br>
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
  </div>
</template>

<script>
export default {
  name: "Dices",
  data() {
    return {};
  },

  props: ["dice1", "dice2", "dice3", "dice4", "dice5", "dicesSize"],

  methods: {},
};

</script>

<style scoped>
#productivityPoints {
  font-size: 18px;
}
</style>
