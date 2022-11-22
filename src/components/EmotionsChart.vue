<script setup>
import ChartComponent from "@/components/ChartComponent.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
let chartChildComponent = ref();
let chartColors = [
  "#984E4E",
  "#1A6420",
  "#906490",
  "#8F8A57",
  "#4E8698",
  "#664E98",
  "#737373",
];
let chartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let chartData = [[0], [0], [0], [0], [0], [0], [0]];

function handleEmotionsEvents(evt) {
  let a = evt.detail.output.emotion.Angry * 100;
  let b = evt.detail.output.emotion.Disgust * 100;
  let c = evt.detail.output.emotion.Fear * 100;
  let d = evt.detail.output.emotion.Happy * 100;
  let e = evt.detail.output.emotion.Sad * 100;
  let f = evt.detail.output.emotion.Surprise * 100;
  let g = evt.detail.output.emotion.Neutral * 100;
  chartChildComponent.value.updateChartData([a, b, c, d, e, f, g]);
}

onMounted(() => {
  window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionsEvents);
});

onBeforeUnmount(() => {
  window.removeEventListener("CY_FACE_EMOTION_RESULT", handleEmotionsEvents);
});
</script>

<template>
  <div id="chartContainer">
    <ChartComponent
      :colors="chartColors"
      :labels="chartLabels"
      :initialValues="chartData"
      canvasId="emotionsChart"
      ref="chartChildComponent"
    />
  </div>
</template>

<style lang="css" scoped>
#chartContainer {
  position: relative;
  width: 402px;
  height: 141px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
  background: rgba(0, 0, 0, 0.7);
  opacity: 1;
  border-radius: 41px;
}
</style>
