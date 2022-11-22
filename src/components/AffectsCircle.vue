<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import WordsGrid from "@/components/WordsGrid.vue";

let circleContainer = null;
const firstWordColor = ref("black");
let pin = null;
let segmentTLDiv = null;
let segmentTRDiv = null;
let segmentBLDiv = null;
let segmentBRDiv = null;
let timeout = null;
function hideSegments() {
  segmentTLDiv.style.boxShadow = "inset 0px 0px 0px 5px #fada31";
  segmentTRDiv.style.boxShadow = "inset 0px 0px 0px 5px #59d445";
  segmentBLDiv.style.boxShadow = "inset 0px 0px 0px 5px #ef5151";
  segmentBRDiv.style.boxShadow = "inset 0px 0px 0px 5px #3e8eec";
  hidePin();
}

function handleArousalValenceEvents(evt) {
  clearTimeout(timeout);
  timeout = setTimeout(hideSegments, 1000);
  let valence = evt.detail.output.valence;
  let arousal = evt.detail.output.arousal;
  showPin();

  let coortinates = calcCoorinate(evt.detail.output);
  setPinPosition(coortinates.x, coortinates.y);

  if (valence < 0 && arousal > 0) {
    pin.style.backgroundColor = "#fada31";
    firstWordColor.value = "#fada31";
  } else if (valence > 0 && arousal > 0) {
    pin.style.backgroundColor = "#59d445";
    firstWordColor.value = "#59d445";
  } else if (valence < 0 && arousal < 0) {
    pin.style.backgroundColor = "#ef5151";
    firstWordColor.value = "#ef5151";
  } else if (valence > 0 && arousal < 0) {
    pin.style.backgroundColor = "#3e8eec";
    firstWordColor.value = "#3e8eec";
  }
}

function calcCoorinate({ valence, arousal }) {
  const containerWidth = circleContainer.offsetWidth;
  const containerHeight = circleContainer.offsetHeight;

  const normalized = (z) => (z + 1) / 2;

  return {
    x: containerWidth * normalized(valence),
    y: containerHeight * normalized(arousal),
  };
}

function setPinPosition(x, y) {
  pin.style.left = `${x}px`;
  pin.style.bottom = `${y}px`;
}

function showPin() {
  pin.style.opacity = 0.5;
}

function hidePin() {
  pin.style.opacity = 0;
}

onMounted(() => {
  circleContainer = document.querySelector(".circlecontainer");
  pin = document.querySelector(".pin");
  window.addEventListener(
    "CY_FACE_AROUSAL_VALENCE_RESULT",
    handleArousalValenceEvents
  );
});
onBeforeUnmount(() => {
  window.removeEventListener(
    "CY_FACE_AROUSAL_VALENCE_RESULT",
    handleArousalValenceEvents
  );
  hideSegments();
  clearTimeout(timeout);
});
</script>

<template>
  <div id="componentContainer" class="mt-3">
    <div class="circlecontainer">
      <WordsGrid :wordColor="firstWordColor" style="z-index: 10" />
      <div class="block blockTL">
        <div class="blockName blockNameTL">Obstructive</div>
      </div>

      <div class="block blockTR">
        <div class="blockName blockNameTR">High Control</div>
      </div>

      <div class="block blockBL">
        <div class="blockName blockNameBL">Low Control</div>
      </div>

      <div class="block blockBR">
        <div class="blockName blockNameBR">Conductive</div>
      </div>
      <div class="pin"></div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.blockName {
  position: absolute;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  color: #c4c5c5;
  opacity: 0.8;
}
.blockNameTL {
  top: 20%;
  left: -2%;
  transform: rotateZ(-45deg);
}
.blockNameTR {
  top: 18%;
  right: -3.5%;
  transform: rotateZ(45deg);
}
.blockNameBL {
  top: 70%;
  left: -2%;
  transform: rotateZ(-315deg);
}
.blockNameBR {
  top: 70%;
  right: -3%;
  transform: rotateZ(315deg);
}
.circlecontainer {
  width: 325px;
  height: 325px;
}

.block {
  width: 50%;
  height: 50%;
  overflow: hidden;
  position: absolute;
}
.blockTL {
  top: 0;
  left: 0;
  border-bottom: 2px #ffffff0a solid;
  border-right: 2px #ffffff0a solid;
}
.blockTR {
  top: 0;
  left: 50%;
  border-bottom: 2px #ffffff0a solid;
  border-left: 2px #ffffff0a solid;
}
.blockBL {
  top: 50%;
  left: 0;
  border-top: 2px #ffffff0a solid;
  border-right: 2px #ffffff0a solid;
}
.blockBR {
  top: 50%;
  left: 50%;
  border-top: 2px #ffffff0a solid;
  border-left: 2px #ffffff0a solid;
}
.innerCircle {
  box-sizing: border-box;
  position: absolute;
  width: 93.5%;
  height: 93.5%;
  border: 20px solid #747474;
  border-radius: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pin {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 0 0 0;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, +50%);

  background: #d9c03c;
  border: 3px solid #ffffff;
  box-shadow: 0px 0px 51px rgba(0, 0, 0, 0.25);
}

</style>
