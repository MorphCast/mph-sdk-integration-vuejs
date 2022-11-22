<script setup>
import { onMounted, onBeforeUnmount } from "vue";
let timeout = null;
let faceTracker = null;
const props = defineProps(["videoEl", "mirrored"]);

function handleFaceEvents(evt) {
  if (evt.detail && evt.detail.rects && evt.detail.rects.length > 0) {
    const $vid = props.videoEl;

    const scale_w = $vid.offsetWidth / this._sdk_w;
    const scale_h = $vid.offsetHeight / this._sdk_h;

    const y_diff = $vid.offsetHeight - this._sdk_h;
    const x_diff = $vid.offsetWidth - this._sdk_x;

    const offset_x = Math.round(x_diff / 2);
    const offset_y = Math.round(y_diff / 2);
    faceTracker.style.width =
      Math.round(evt.detail.rects[0].width * scale_w) + "px";
    faceTracker.style.height =
      Math.round(evt.detail.rects[0].height * scale_h) + "px";
    faceTracker.style.top =
      Math.round(evt.detail.rects[0].y * scale_h) +
      (y_diff > x_diff ? offset_y : 0) +
      "px";
    if (!props?.mirrored) {
      faceTracker.style.left =
        Math.round(evt.detail.rects[0].x * scale_w) +
        (y_diff < x_diff ? offset_x : 0) +
        "px";
    } else {
      faceTracker.style.right =
        Math.round(evt.detail.rects[0].x * scale_w) +
        (y_diff < x_diff ? offset_x : 0) +
        "px";
    }

    faceTracker.style.display = "block";
    resetTimeout();
  }
}

function setSdkDimensions(evt) {
  this._sdk_w = evt.detail.width;
  this._sdk_h = evt.detail.height;
}

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(setAllToZero, 500);
}
function setAllToZero() {
  faceTracker.style.display = "none";
}

onMounted(() => {
  faceTracker = document.querySelector("#faceTracker");
  window.addEventListener("CY_FACE_DETECTOR_RESULT", handleFaceEvents);
  window.addEventListener(
    // eslint-disable-next-line no-undef
    "CY_CAMERA_RESULT",
    setSdkDimensions
  );
});
onBeforeUnmount(() => {
  window.removeEventListener("CY_FACE_DETECTOR_RESULT", handleFaceEvents);
  window.removeEventListener("CY_CAMERA_RESULT", setSdkDimensions);

  clearTimeout(timeout);
  setAllToZero();
});
</script>

<template>
  <div id="faceTracker"></div>
</template>

<style lang="css" scoped>
#faceTracker {
  position: absolute;
  border: 5px solid #ff871d3b;
}
</style>
