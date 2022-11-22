<script setup>
import { onMounted, ref } from "vue";

const gender = ref("undef");
let timeout = undefined;

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    gender.value = "undef";
  }, 3000);
}

onMounted(() => {
  window.addEventListener("CY_FACE_GENDER_RESULT", (evt) => {
    resetTimeout();
    gender.value = evt.detail.output.mostConfident || "undef";
  });
});
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <img v-if="gender.toLowerCase() === 'male'" src="/male.png" class="image" />
    <img
      v-if="gender.toLowerCase() === 'female'"
      src="/female.png"
      class="image"
    />
    <div v-if="gender.toLowerCase() === 'undef'" style="height: 20px"></div>
  </div>
</template>

<style lang="css" scoped>
.image {
  width: 100px;
  height: auto;
}
#title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: right;

  color: #bababa;
}
@media screen and (max-width: 768px) and (orientation: portrait) {
  .image {
    height: 20px;
  }
}
</style>
