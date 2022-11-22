<script setup>
import RangeComponent from "@/components/RangeComponent.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
let ageValue = ref(0);
let ageMin = ref(0);
let ageMax = ref(10);
let timeout = undefined;

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    ageValue.value = 0;
    ageMin.value = "";
    ageMax.value = "";
  }, 3000);
}

function handleAgeEvent(evt) {
  resetTimeout();
  ageValue.value = parseInt(evt.detail.output.numericAge) || 0;
  ageMin.value = parseInt(ageValue.value / 10) * 10;
  ageMax.value = (parseInt(ageValue.value / 10) + 1) * 10;
}

onMounted(() => {
  window.addEventListener("CY_FACE_AGE_RESULT", handleAgeEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener("CY_FACE_AGE_RESULT", handleAgeEvent);
  ageValue.value = 0;
  clearTimeout(timeout);
});
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <span class="age" id="ageMin">{{ ageMin }}</span>
      <RangeComponent
        name=""
        :value="ageValue"
        color="#e2921980"
        :notCentered="true"
      ></RangeComponent>
      <span class="age" id="ageMax">{{ ageMax }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
#title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: right;

  color: #bababa;
}
.age {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  text-align: right;
  margin-left: 5px;
  margin-right: 5px;
  color: #bababa;
}
</style>
