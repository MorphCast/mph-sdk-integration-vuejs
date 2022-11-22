<script setup>
import FaceTracker from "@/components/overlay/FaceTracker.vue";
import { ref, onMounted } from "vue";
const videoEl = ref(null);
const fps = ref(0);
onMounted(() => {
  videoEl.value = document.getElementById("videoEl");
  window.addEventListener("CY_DATA_AGGREGATOR", handleDataAggregated);
});

function handleDataAggregated(evt) {
  fps.value = evt.detail?.totalFaces?.samples || "";
}
</script>

<template>
  <div id="cameraContainer">
    <video id="videoEl" playsinline></video>
    <FaceTracker :videoEl="videoEl" :mirrored="true"></FaceTracker>
    <span class="fpsLabel">{{ fps }} fps</span>
  </div>
</template>

<style lang="css" scoped>
#cameraContainer {
  box-sizing: border-box;
  bottom: 0px;
  aspect-ratio: 1 / 1;
  width: 320px;
  border-radius: 62px;
}
#videoEl {
  object-fit: cover;
  transform: rotateY(180deg);
  width: 100%;
  height: 100%;
  border-radius: 62px;
  aspect-ratio: 1 / 1;
}
.fpsLabel {
  position: absolute;
  font-size: 14px;
  color: orange;
  top: 15px;
  right: 30px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;

  color: #e29219;

  mix-blend-mode: normal;
}

</style>
