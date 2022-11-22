<script setup>
import { onMounted, ref } from "vue";
let timeout = undefined;
let feat = ref(["", "", "", "", ""]);

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    feat.value = ["", "", "", "", ""];
  }, 3000);
}

function extract(obj, n) {
  let sortable = [];
  for (var feature in obj) {
    sortable.push([feature, obj[feature]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortable.slice(0, n);
}

onMounted(() => {
  window.addEventListener("CY_FACE_FEATURES_RESULT", (evt) => {
    resetTimeout();
    let features = extract(evt.detail.output.features, 5);
    feat.value = features.map(([feature]) => feature);
  });
});
</script>

<template>
  <div
    class="wrap h-100 d-flex flex-column justify-content-center align-items-center"
  >
    <span class="feature" v-if="feat[0] != null"> {{ feat[0] }}</span>
    <span class="feature" v-if="feat[1] != null"> {{ feat[1] }}</span>
    <span class="feature" v-if="feat[2] != null"> {{ feat[2] }}</span>
    <span class="feature" v-if="feat[3] != null"> {{ feat[3] }}</span>
    <span class="feature" v-if="feat[4] != null"> {{ feat[4] }}</span>
    <span class="feature" v-if="feat[5] != null"> {{ feat[5] }}</span>
    <span class="feature" v-if="feat[6] != null"> {{ feat[6] }}</span>
    <span class="feature" v-if="feat[7] != null"> {{ feat[7] }}</span>
    <span class="feature" v-if="feat[8] != null"> {{ feat[8] }}</span>
  </div>
</template>

<style lang="css" scoped>
.wrap {
  height: calc(100% - 30px);
  width: 100%;
  color: #464646;
}
.feature {
  width: 100%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  color: #bababa;
}
.wrap.black {
  color: white;
}
</style>
