<script setup>
import BasicMoodGrid from "@/components/overlay/BasicMoodGrid.vue";
import AdvancedMoodGrid from "@/components/overlay/AdvancedMoodGrid.vue";
import { ref } from "vue";
const affectsSwitch = ref(1);

const chnageRangeValue = () => {
  if (affectsSwitch.value == 1) affectsSwitch.value = 2;
  else affectsSwitch.value = 1;
};

const compareAffectsSwitchValue = (val) => {
  if (val == affectsSwitch.value) return true;
  else false;
};
</script>

<template>
  <div
    id="moodGridContainer"
    class="d-none d-md-flex flex-column justify-content-around align-items-center"
  >
    <div id="gridContainer">
      <BasicMoodGrid v-if="compareAffectsSwitchValue(1)"></BasicMoodGrid>
      <AdvancedMoodGrid v-if="compareAffectsSwitchValue(2)"></AdvancedMoodGrid>
    </div>
    <div
      class="d-flex flex-row justify-content-around align-items-center"
      @click="chnageRangeValue()"
    >
      <span class="sliderText">38 Affects</span>
      <input
        id="affectsSwitch"
        type="range"
        min="1"
        max="2"
        :value="affectsSwitch"
        class="slider"
      />
      <span class="sliderText">98 Affects</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
#moodGridContainer {
  z-index: 10;
  width: 600px;
  height: 600px;
}
#gridContainer {
  width: 550px;
  height: 500px;
  border: 17px solid rgba(0, 0, 0, 0.2);
  /* stile1 */
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.15));
  backdrop-filter: blur(25px);
  border-radius: 58px;
}
.closeButton {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.15));
  backdrop-filter: blur(25px);
  color: white;
}

.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  pointer-events: none;
  width: 46px; /* Full-width */
  height: 4px; /* Specified height */
  background: #ffffff;
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 1s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  transition: all 0.7s;
  margin: 8px;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 27px; /* Set a specific slider handle width */
  height: 27px; /* Slider handle height */
  background: #19e282; /* Green background */
  border-radius: 50%;
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 27px; /* Set a specific slider handle width */
  height: 27px; /* Slider handle height */
  background: #19e282; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
.sliderText {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */

  color: #ffffff;
}
</style>
