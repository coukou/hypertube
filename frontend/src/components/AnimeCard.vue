<template>
  <div class="card">
    <h1>{{title}}</h1>
    <div class="card-thumb" :style="`background-image: url('${thumb}')`"></div>
  </div>
</template>

<script>
export default {
  props: ["title", "thumb"]
};
</script>

<style scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  width: 300px;
}
.card-thumb {
  height: 300px;
  width: 200px;
  margin: auto;
  background-size: contain;
  background-repeat: no-repeat;
}
.card > h1 {
  font-size: 20px;
  text-align: center;
}
</style>
