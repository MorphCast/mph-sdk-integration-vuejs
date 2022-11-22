<script setup>
import IconPageSelectorArrow from "./icons/IconPageSelectorArrow.vue";
const props = defineProps(["name", "page", "changePage"]);
</script>

<template>
  <div
    id="selectorContainer"
    class="w-100 d-flex flex-row flex-wrap justify-content-center align-items-center"
  >
    <div class="arrow flipped" @click="props.changePage('prev')">
      <IconPageSelectorArrow></IconPageSelectorArrow>
    </div>
    <div class="pageName">
      <span>{{ props.name }}</span>
    </div>
    <div class="arrow" @click="props.changePage('next')">
      <IconPageSelectorArrow></IconPageSelectorArrow>
    </div>
  </div>
</template>

<style lang="css" scoped>
.pageName {
  width: 149px;
  height: 45px;
}
.pageName span {
  position: absolute;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #bababa;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.arrow {
  width: 25px;
  height: 25.8px;
}
.flipped {
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}

@media screen and (max-width: 768px) and (orientation: portrait) {
  .pageName span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height */

    text-align: center;
    text-transform: uppercase;

    color: #e29219;
  }
}
</style>
