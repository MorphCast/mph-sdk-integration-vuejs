<script setup>
import { onMounted } from "vue";
const props = defineProps({
  labels: { type: Array },
  initialValues: { type: Array },
  colors: { type: Array },
  canvasId: { type: String },
});
let chart;

function updateChartData(values) {
  chart.data.datasets.forEach((dataset, index) => {
    let tmpDataset = dataset.data;

    tmpDataset.push(values[index]);
    if (tmpDataset.length > 10) tmpDataset = tmpDataset.slice(-10);
    dataset.data = tmpDataset;
  });

  chart.update();
}

defineExpose({
  updateChartData,
});

function loadChartLib(labels, dataArray, colors) {
  let datasets = [];
  dataArray.forEach((data, index) => {
    datasets.push({
      backgroundColor: colors[index],
      borderColor: colors[index],
      borderWidth: 1.4,
      data: data,
    });
  });
  const data = {
    labels: labels,
    datasets: datasets,
  };
  const config = {
    type: "line",
    data: data,

    options: {
      animation: {
        duration: 0,
      },
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          min: 0,
          max: 100,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  // eslint-disable-next-line no-undef
  return new Chart(document.getElementById(props.canvasId), config);
}

onMounted(() => {
  chart = loadChartLib(props.labels, props.initialValues, props.colors);
});
</script>

<template>
  <canvas :id="props.canvasId"></canvas>
</template>

<style lang="css" scoped>
@media only screen and (max-width: 768px) {
}
@media only screen and (min-width: 769px) {
}

@media only screen and (max-width: 992px) {
}
</style>
