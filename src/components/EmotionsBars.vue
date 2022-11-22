<script setup>
import SingleBar from "@/components/SingleBar.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
const props = defineProps(["barSize"]);

const angry = ref(0);
const disgust = ref(0);
const fear = ref(0);
const happy = ref(0);
const sad = ref(0);
const surprise = ref(0);
const neutral = ref(0);
const isLg = props.barSize == "big";
let timeout = null;

function handleEmotionsEvents(evt) {
  angry.value = evt.detail.output.emotion.Angry * 100;
  disgust.value = evt.detail.output.emotion.Disgust * 100;
  fear.value = evt.detail.output.emotion.Fear * 100;
  happy.value = evt.detail.output.emotion.Happy * 100;
  sad.value = evt.detail.output.emotion.Sad * 100;
  surprise.value = evt.detail.output.emotion.Surprise * 100;
  neutral.value = evt.detail.output.emotion.Neutral * 100;
  resetTimeout();
}

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(setAllToZero, 1500);
}
function setAllToZero() {
  angry.value = 0;
  disgust.value = 0;
  fear.value = 0;
  happy.value = 0;
  sad.value = 0;
  surprise.value = 0;
  neutral.value = 0;
}

onMounted(() => {
  window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionsEvents);
});

onBeforeUnmount(() => {
  window.removeEventListener("CY_FACE_EMOTION_RESULT", handleEmotionsEvents);
  setAllToZero();
  clearTimeout(timeout);
});
</script>

<template>
  <div id="emotionsContainer" class="d-flex flex-wrap" :class="{ big: isLg }">
    <SingleBar color1="#E21919" color2="#984E4E" name="Angry" :value="angry" />
    <SingleBar
      color1="#37D042"
      color2="#1A6420"
      name="Disgust"
      :value="disgust"
    />
    <SingleBar color1="#FF007A" color2="#906490" name="Fear" :value="fear" />
    <SingleBar color1="#FFEA00" color2="#8F8A57" name="Happy" :value="happy" />
    <SingleBar color1="#6CB4DF" color2="#4E8698" name="Sad" :value="sad" />
    <SingleBar
      color1="#F5B9C3"
      color2="#664E98"
      name="Surprise"
      :value="surprise"
    />
    <SingleBar
      color1="#A9A9A9"
      color2="#737373"
      name="Neutral"
      :value="neutral"
    />
  </div>
</template>

<style lang="css" scoped>
#emotionsContainer {
  position: relative;
  width: 402px;
  height: 141px;
  background: rgba(0, 0, 0, 0);
  opacity: 1;
  border-radius: 41px;
}
.big {
  height: 210px !important;
}

@media only screen and (max-width: 767px) {
  #emotionsContainer {
    height: 141px !important;
    width: 350px;
  }
}
@media only screen and (max-height: 832px) {
  #emotionsContainer {
    height: 130px !important;
  }
}
</style>
