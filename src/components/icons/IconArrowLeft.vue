<script setup>
const props = defineProps(["colorFill"]);
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 1 10.921 10.644"
  >
    <g id="arrow-left" transform="translate(-79.999 -650.428)">
      <path
        id="Icon_awesome-arrow-right"
        data-name="Icon awesome-arrow-right"
        d="M4.643,3.36l.541-.541a.583.583,0,0,1,.826,0l4.738,4.736a.583.583,0,0,1,0,.826L6.011,13.12a.583.583,0,0,1-.826,0l-.541-.541a.586.586,0,0,1,.01-.836l2.937-2.8H.585A.584.584,0,0,1,0,8.359v-.78a.584.584,0,0,1,.585-.585H7.59L4.653,4.2A.581.581,0,0,1,4.643,3.36Z"
        transform="translate(90.92 663.72) rotate(180)"
        :fill="props.colorFill"
      />
    </g>
  </svg>
</template>
