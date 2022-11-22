<script setup>
import { onMounted, ref } from "vue";
import IconPlayerPause from "@/components/icons/IconPlayerPause.vue";
import IconPlayerMute from "@/components/icons/IconPlayerMute.vue";
import IconPlayerUnmute from "@/components/icons/IconPlayerUnmute.vue";
import IconPlayerPlay from "@/components/icons/IconPlayerPlay.vue";
import IconPlayerVolume from "@/components/icons/IconPlayerVolume.vue";
const props = defineProps(["videoEl"]);
const playing = ref(false);
const muted = ref(false);
const showVolumeRange = ref(false);
let hideVolumeRangeTimeout = null;
let media = null;
let volumeRange = null;

function bindVideoEvents() {
  media.addEventListener("ended", () => {
    playing.value = false;
  });
  media.addEventListener("loadedmetadata", () => {
    playing.value = false;
    volumeRange.value = media.volume * 100;
  });
}

function changeVolume() {
  let value = volumeRange.value;
  if (media) media.volume = parseFloat(value / 100).toFixed(2);
}
onMounted(() => {
  volumeRange = document.querySelector("#volumeRange");
  console.log(volumeRange);
  volumeRange.addEventListener("change", changeVolume);
});

function playPauseMedia() {
  if (props.videoEl) {
    media = props.videoEl;
    bindVideoEvents();
  }

  if (media.paused) {
    media.play();
    playing.value = true;
  } else {
    media.pause();
    playing.value = false;
  }
}
function toggleMuteMedia() {
  let media = props.videoEl;
  if (media.muted) {
    media.muted = false;
    muted.value = false;
  } else {
    media.muted = true;
    muted.value = true;
  }
}

function toggleVolumeRange() {
  clearTimeout(hideVolumeRangeTimeout);
  showVolumeRange.value = !showVolumeRange.value;
  if (showVolumeRange.value === true) {
    hideVolumeRangeTimeout = setTimeout(() => {
      showVolumeRange.value = false;
    }, 5000);
  }
}
</script>

<template>
  <div id="controlsContainer">
    <div class="d-flex flex-row justify-content-around align-items-center">
      <IconPlayerMute
        v-if="!muted"
        class="control"
        @click="toggleMuteMedia()"
      />
      <IconPlayerUnmute
        v-if="muted"
        class="control"
        @click="toggleMuteMedia()"
      />
      <IconPlayerPause
        v-if="playing"
        class="control"
        @click="playPauseMedia()"
      />
      <IconPlayerPlay
        v-if="!playing"
        class="control"
        @click="playPauseMedia()"
      />
      <IconPlayerVolume class="control" @click="toggleVolumeRange()" />
      <div
        :style="{ display: showVolumeRange ? 'block' : 'none' }"
        id="volumeRangeContainer"
      >
        <input id="volumeRange" type="range" value="100" orient="vertical" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#controlsContainer {
  width: 150px;
  height: 50px;
  z-index: 5;
}
.control {
  cursor: pointer;
}
#volumeRangeContainer {
  width: 90px;
  height: 30px;
  position: absolute;
  bottom: 220%;
  right: -22%;
  transform: rotate(-90deg);
}
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: none; /* Chromium */
  width: 100%;
  height: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  outline: none;
  -webkit-appearance: none;
  background-color: #bababa;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #bababa;
}
input[type="range"]::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5.5px;
}

@media only screen and (max-width: 769px) {
}

@media only screen and (max-width: 992px) {
}
</style>
