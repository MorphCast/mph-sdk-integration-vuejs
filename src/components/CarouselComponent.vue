<script setup>
const props = defineProps(["page"]);
</script>

<template>
  <div
    id="carouselContainer"
    class="w-100 d-flex flex-row flex-wrap justify-content-center align-items-center"
  >
    <div class="bullet m-1" :class="{ big: props.page == 1 }"></div>
    <div class="bullet m-1" :class="{ big: props.page == 2 }"></div>
    <div class="bullet m-1" :class="{ big: props.page == 3 }"></div>
  </div>
</template>

<style lang="css" scoped>
.bullet {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #898989;
  opacity: 0.7;
}
.big {
  width: 16px;
  height: 16px;
  background: #bababa;
  opacity: 1;
}
</style>
