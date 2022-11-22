<script setup>
const props = defineProps({
  value: { type: Number, required: true },
  name: { type: String, required: true },
  color1: { type: String, default: "#56B568" },
  color2: { type: String, default: "#56B568" },
});
</script>

<template>
  <div class="d-flex flex-column" id="barContainer">
    <div class="progress-bar-container">
      <div
        class="progress-bar-indicator"
        :style="{
          height: props.value + '%',
          'background-image':
            'linear-gradient(135deg, ' +
            props.color1 +
            ' 0%,' +
            props.color2 +
            ' 100%)',
        }"
      ></div>
    </div>

    <span class="barName mt-1">{{ props.name }}</span>
  </div>
</template>

<style lang="css" scoped>
.progress-bar-container {
  height: 90%;
  width: 7px;
  position: relative; /* relative here */
  background: #454459;
  opacity: 0.9;
  border-radius: 10px;
  transform: translateX(-50%);
  left: 50%;
}

.progress-bar-indicator {
  width: 9px;
  position: absolute;
  bottom: 0;
  border-radius: 25px;
  /* this will do the magic */
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);
  left: -0.5px;
  transition: height 0.5s;
  background-image: linear-gradient(135deg, #6cb4df 0%, #4e8698 100%);
}
.progress-bar-indicator::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#barContainer {
  height: 100%;
  width: 57px;

  top: 0;
}
.barName {
  font-family: "Montserrat";
  font-style: normal;

  font-weight: 200;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.04em;

  color: #f9f9f9;
}

@media only screen and (max-width: 767px) {
  #barContainer {
    height: 100%;
    width: 50px;

    top: 0;
  }
  .barName {
    font-weight: 200;
    font-size: 12.5px;

    color: #f9f9f9;
  }
}
</style>
