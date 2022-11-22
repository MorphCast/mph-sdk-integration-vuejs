<script setup>
import CameraComponent from "@/components/CameraComponent.vue";
import RangeComponent from "@/components/RangeComponent.vue";
import ChartComponent from "@/components/ChartComponent.vue";

import IconInfo from "@/components/icons/IconInfo.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
let chartColors = ["#E29219", "#19E282", "#FFFFFF"];
let chartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let chartData = [[0], [0], [0]];
let arousal = ref(0);
let valence = ref(0);
let attention = ref(0);
let chartChildComponent = ref();

let timeout = null;

function handleArousalValenceEvents(evt) {
  valence.value = Math.abs(evt.detail.output.valence * 100) || "0";
  arousal.value = Math.abs(evt.detail.output.arousal * 100) || "0";
  resetTimeout();
  chartChildComponent.value.updateChartData([
    arousal.value,
    valence.value,
    attention.value,
  ]);
}
function handleAttentionEvents(evt) {
  if (evt.detail.output.attention > 0.1) {
    attention.value = evt.detail.output.attention * 100 || "0";
    resetTimeout();
  }
}
function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(setAllToZero, 1500);
}
function setAllToZero() {
  arousal.value = 0;
  valence.value = 0;
  attention.value = 0;
}

onMounted(() => {
  window.addEventListener(
    "CY_FACE_AROUSAL_VALENCE_RESULT",
    handleArousalValenceEvents
  );
  window.addEventListener("CY_FACE_ATTENTION_RESULT", handleAttentionEvents);
});
onBeforeUnmount(() => {
  window.removeEventListener(
    "CY_FACE_AROUSAL_VALENCE_RESULT",
    handleArousalValenceEvents
  );
  window.removeEventListener("CY_FACE_ATTENTION_RESULT", handleAttentionEvents);
  clearTimeout(timeout);
  valence.value = 0;
  arousal.value = 0;
  attention.value = 0;
});
</script>

<template>
  <div
      id="engagementContainer"
    >
      <div
        id="rangesContainer"
        class="d-flex flex-row justify-content-center d-md-block"
      >
        <div class="rangeContainer">
          <RangeComponent name="Arousal" :value="arousal" color="#E29219" />
        </div>
        <div class="rangeContainer">
          <RangeComponent name="Valence" :value="valence" color="#19E282" />
        </div>
        <div class="rangeContainer">
          <RangeComponent
            name="Attention"
            :value="attention"
            color="#FFFFFF"
          />
        </div>
      </div>
      <br /><br />
      <div id="emotionChartContainer" style="">
        <div class="chart-container">
          <ChartComponent
            canvasId="engagementChart"
            :colors="chartColors"
            :labels="chartLabels"
            :initialValues="chartData"
            ref="chartChildComponent"
          />
        </div>
      </div>
  </div>
</template>

<style lang="css" scoped>
#engagementContainer {
  width: 402px;
  height: 100%;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(25px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 30px;
}
.chart-container {
  position: relative;
  margin: auto;
  height: 100%;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 5%;
}
#rangesContainer {
  height: 100%;
  width: 40%;
}
.rangeContainer {
  width: 100%;
}
#emotionChartContainer {
  height: 40%;
  width: 100%;
}

</style>
