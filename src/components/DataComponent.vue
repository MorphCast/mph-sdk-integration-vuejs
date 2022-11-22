<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import EmotionsChart from "@/components/EmotionsChart.vue";
import EmotionsBars from "@/components/EmotionsBars.vue";
import AffectsCircle from "@/components/AffectsCircle.vue";
import IconCommand from "@/components/icons/IconCommand.vue";
import PageSelector from "@/components/PageSelector.vue";
import CarouselComponent from "@/components/CarouselComponent.vue";
import LikelyAge from "@/components/LikelyAge.vue";
import GenderComponent from "@/components/GenderComponent.vue";
import FeatureComponent from "@/components/FeatureComponent.vue";
import EngagementContainer from "../components/EngagementContainer.vue";

let dataContainer = null;

const isMobile = () => {
  return window.innerWidth < 800;
};
onMounted(() => {
  dataContainer = document.querySelector("#dataContainer");
});

onUnmounted(() => {

});

</script>

<template>
  <div
    id="dataContainer"
  >
    <div>
      <div>
        <EngagementContainer
        ></EngagementContainer>
      </div>

      <div
        id="centralContainer"
        class="d-flex flex-column justify-content-around align-items-center"
      >
        <EmotionsChart ></EmotionsChart>
        <EmotionsBars barSize="big"></EmotionsBars>
        <div>
          <AffectsCircle />
        </div>
        <div
          class="d-flex flex-row"
          style="width: 65%; padding-top: 10px; padding-bottom: 10px"
        >
          <div
            style="
              width: 40%;
              height: 110%;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
          ></div>
          <div class="w-50 p-2">
            <LikelyAge></LikelyAge>
          </div>
          <div class="w-50 p-2">
            <GenderComponent></GenderComponent>
          </div>
        </div>
        <div style="height: 130px">
          <FeatureComponent></FeatureComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#centralContainer {
  width: 100%;
  height: calc(100% - 80px);
}
#dataContainer {
  width: 450px;
  height: 55%;
  max-height: 684px;
  right: 0px;
  top: 374px;

  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  /* Note: backdrop-filter has minimal browser support */

  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  transition: transform 0.7s;
}

@media only screen and (max-width: 767px) {
  #dataContainer {
    position: absolute;
    width: 100%;
    height: 60%;
    max-height: 684px;
    right: 0px;
    top: 40%;

    /* Note: backdrop-filter has minimal browser support */

    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    transition: transform 0s;

    background: rgba(0, 0, 0, 0.5);
    opacity: 0.9;
    border: 1px solid #2b2b2b;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }
}
@media only screen and (max-height: 832px) and (min-width: 767px) {
  #dataContainer {
    right: 0px;
    top: 300px;
    height: 60%;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
}
</style>
