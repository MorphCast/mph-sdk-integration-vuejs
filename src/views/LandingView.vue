<script setup>

import MoodGrid from "@/components/MoodGrid.vue";
import EmotionsChart from "@/components/EmotionsChart.vue";
import EmotionsBars from "@/components/EmotionsBars.vue";
import AffectsCircle from "@/components/AffectsCircle.vue";
import FeatureComponent from "@/components/FeatureComponent.vue";
import LikelyAge from "@/components/LikelyAge.vue";
import GenderComponent from "@/components/GenderComponent.vue";
import EngagementContainer from "@/components/EngagementContainer.vue";
import CameraComponent from "@/components/CameraComponent.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { getAiSdkControls } from "../morphcast-ai-sdk/ai-sdk-loader";

onMounted(async () => {
  const { source, start } = await getAiSdkControls();
  await source.useCamera({
    toVideoElement: document.getElementById("videoEl"),
  });
  await start();
});

onUnmounted(async () => {
  const { stop } = await getAiSdkControls();
  await stop();
});
</script>

<template>

  <div class="flex-centered text-white">
    Camera:<br />
    <CameraComponent />
  </div>

  <hr class="solid">

  <div class="flex-centered text-white">
    Engagement bars with chart:<br />
    <EngagementContainer></EngagementContainer>
  </div>

  <hr class="solid">

  <div class="flex-centered text-white">
    Emotions chart:<br />
    <EmotionsChart></EmotionsChart>
  </div>

  <hr class="solid">

  <div class="flex-centered text-white">
    Emotions bars<br />
    <EmotionsBars barSize="big"></EmotionsBars>
  </div>

  <hr class="solid">

  <div class="flex-centered text-white">
    Affect Words & Quadrants:<br />
    <AffectsCircle barSize="big"></AffectsCircle>
  </div>

  <hr class="solid">

  <div class="flex-centered text-white" style="min-height: 133px">
    Face Features:<br />
    <FeatureComponent barSize="big"></FeatureComponent>
  </div>

  <hr class="solid" />

  <div class="flex-centered text-white">
    Age:<br />
    <LikelyAge barSize="big"></LikelyAge>
  </div>

  <hr class="solid" />

  <div class="flex-centered text-white" style="min-height: 126px">
    Gender:<br />
    <GenderComponent barSize="big"></GenderComponent>
  </div>

  <hr class="solid" />

  <div class="flex-centered text-white">
    Mood grid:<br />
    <MoodGrid></MoodGrid>
  </div>

</template>

<style type="text/css" scoped>
.flex-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text-white {
  color: white
}

hr.solid {
  border-top: 3px solid #fff;
}
</style>
