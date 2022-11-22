<script setup>
const props = defineProps({
  value: { type: Number, default: 0 },
  name: { type: String, required: true },
  color: { type: String, default: "#e29219" },
  notCentered: { type: Boolean, default: false },
});
</script>

<template>
  <input
    type="range"
    min="1"
    max="100"
    :value="props.value"
    class="slider"
    :class="{ notCentered }"
    :style="{ background: props.color }"
  />
  <h5 class="title">{{ props.name }}</h5>
</template>

<style lang="css" scoped>
.title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  margin: 0;
  color: #e4dcdc;
  margin-bottom: -12px;
}
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  pointer-events: none;
  width: 70%; /* Full-width */
  height: 3px; /* Specified height */
  background: #e29219;
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 1s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  transition: all 0.7s;
  transform: translateX(-50%);
  left: 50%;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 7px; /* Set a specific slider handle width */
  height: 7px; /* Slider handle height */
  background: #e4dcdc; /* Green background */
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  width: 7px; /* Set a specific slider handle width */
  height: 7px; /* Slider handle height */
  background: #e4dcdc; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
.notCentered {
  left: 0;
  transform: translateX(0%);
}
</style>
