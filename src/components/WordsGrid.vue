<script setup>
import { onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  wordColor: { type: String, default: "#56B568" },
});

let stopWordsUpdateFlag = false;
let stopWordsUpdateTimeout = undefined;
let hideWordsTimeout = undefined;
let words = document.getElementsByClassName("words");

const stopWordsUpdate = () => {
  stopWordsUpdateFlag = true;
  stopWordsUpdateTimeout = setTimeout(() => {
    stopWordsUpdateFlag = false;
  }, 600);
};

const handleAffectsEvent = (evt) => {
  if (!stopWordsUpdateFlag) {
    stopWordsUpdate();
    const wordsSorted = Object.entries(evt.detail.output.affects98).sort(
      ([, a], [, b]) => b - a
    );
    for (let i = 0; i < 3; i++) {
      words[i].innerHTML = wordsSorted[i][0];
    }

    clearTimeout(hideWordsTimeout);
    hideWordsTimeout = setTimeout(() => {
      setEmmptyWords();
    }, 3000);
  }
};

const setEmmptyWords = () => {
  for (let i = 0; i < 3; i++) {
    words[i].innerHTML = "";
  }
};

const handleResizeEvent = () => {
  stopWordsUpdateFlag = false;
};

onMounted(() => {
  window.addEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", handleAffectsEvent);
  window.addEventListener("resize", handleResizeEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "CY_FACE_AROUSAL_VALENCE_RESULT",
    handleAffectsEvent
  );
  clearTimeout(stopWordsUpdateTimeout);
  stopWordsUpdateFlag = false;
  clearTimeout(hideWordsTimeout);
});
</script>

<template>
  <div id="wordsContainer">
    <div class="w-100 h-100 d-flex flex-column wordsWrapper">
      <div class="words my-1 first" :style="{ color: props.wordColor }">
        Conceited
      </div>
      <div class="words my-1">Confident</div>
      <div class="words my-1">Conscientious</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#wordsContainer {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.first {
  font-size: 27px !important;
}
.words {
  width: 100%;
  text-align: center;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 104.4%;
  /* or 23px */
  color: #c8c9c9;
  text-align: center;
  text-shadow: 2px 2px #000000;
}
.wordsWrapper {
  justify-content: center !important;
}

@media only screen and (max-width: 769px) {
  .first {
    font-size: 20px !important;
  }
  #wordsContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .words {
    font-size: 16px;
    line-height: 104.4%;
    /* or 23px */
    text-align: center;
  }
}
</style>
