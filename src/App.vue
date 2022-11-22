<script setup>
import { RouterView } from "vue-router";
import { loadScript } from "vue-plugin-load-script";
import { onMounted, onUnmounted, ref, getCurrentInstance } from "vue";
const app = getCurrentInstance();

const scriptLoaded = ref(false);

async function loadChartLib() {
  // eslint-disable-next-line no-undef
  if (!globalThis.Chart)
    await loadScript("https://cdn.jsdelivr.net/npm/chart.js");
  scriptLoaded.value = true;
}
onMounted(() => {
  loadChartLib();
});
onUnmounted(() => {
});
</script>

<template>
  <div class="bgBlended"></div>
  <div v-if="scriptLoaded" id="routerViewContainer">
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Montserrat");

#app {
  font-weight: normal;
  height: 100%;
  width: 100%;
}
#routerViewContainer {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: #3f3f3f;
}
body {
  background-color: black;
}
.bgBlended {
  display: none;
}
</style>
