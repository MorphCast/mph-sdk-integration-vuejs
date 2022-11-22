<template>
  <div ref="wrapper" class="wrapper">
    <img src="/advancedGraph.png" style="width: 100%; height: 100%" />
    <div ref="pin_wrap" class="pin_wrap">
      <div ref="pin" class="pin"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentTime"],
  created() {
    this.crtDisableTimeout = setTimeout(() => this.hidePin(), 1500);
    //this.lastCrt = -1;
    const fn = (evt) => {
      clearTimeout(this.crtDisableTimeout);
      //if (this.lastCrt === this.getCurrentTime()) return;
      //this.lastCrt = this.getCurrentTime();
      this.showPin();
      this.setEmotion(evt.detail.output);
      this.crtDisableTimeout = setTimeout(() => this.hidePin(), 3000);
    };
    const fn2 = () => {
      this.setDim();
    };
    window.addEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", fn);
    window.addEventListener("resize", fn2);
    this.unreg = () => {
      window.removeEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", fn);
      window.removeEventListener("resize", fn2);
    };
  },
  beforeUnmount() {
    this.unreg();
    clearTimeout(this.crtDisableTimeout);
  },
  mounted() {
    this.start = this.currentTime;
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    setDim() {
      let grid = this.$refs.grid;
      if (!grid || grid.clientWidth === 0) {
        setTimeout(() => {
          this.setDim();
        }, 10);
      } else {
        this.$refs.pin_wrap.style.width = grid.clientWidth + "px";
        this.$refs.pin_wrap.style.height = grid.clientHeight + "px";
      }
    },

    setEmotion({ arousal, valence }) {
      let { x, y } = this.calcCoorinate({ valence, arousal });
      x = Math.max(x, 5.15); // check img ratio to avoid ellipse
      y = Math.max(y, 6);
      //console.log(x,y);

      this.setPinPosition(x, y);
    },

    calcCoorinate({ valence, arousal }) {
      const img_outer_width = 800;
      const img_inner_width = 598;
      const img_x_offset = 101;

      const img_outer_height = 686;
      const img_inner_height = 598;
      const img_y_offset = 45;

      const normalized = (z) => (z + 1) / 2;

      return {
        x:
          (100 * (img_x_offset + img_inner_width * normalized(valence))) /
          img_outer_width,
        y:
          (100 * (img_y_offset + img_inner_height * normalized(arousal))) /
          img_outer_height,
      };
    },

    setPinPosition(x, y) {
      this.$refs.pin.style.left = `${x - 5.15}%`; // check img ratio to avoid ellipse
      this.$refs.pin.style.bottom = `${y - 6}%`;
    },

    showPin() {
      this.$refs.pin.style.opacity = 0.7;
    },

    hidePin() {
      this.$refs.pin.style.opacity = 0;
    },
    getCurrentTime() {
      return this.currentTime - this.start;
    },
  },
};
</script>

<style lang="css" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.wrapper .grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
  pointer-events: none;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0.75+0,0+70 */
  /* background: -moz-radial-gradient(center, ellipse cover, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%); /* FF3.6-15 */
  /* background: -webkit-radial-gradient(center, ellipse cover, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%); /* Chrome10-25,Safari5.1-6 */
  /* background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bf000000', endColorstr='#00000000', GradientType=1); /* IE6-9 fallback on horizontal gradient */
}

.pin_wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.pin {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #f8f9fabf;
  background-color: #f8f9fa8a;
  box-shadow: 0 0 0 0;
  opacity: 0;
  position: absolute;
  bottom: 48%;
  left: 48%;
}

@media only screen and (min-width: 1200px) {
  .pin {
    width: 3vw;
    height: 3vw;
  }
}

/*
    @keyframes pulse {
        0% {
            -webkit-transform: scale(1);
        }
        51% {
            -webkit-transform: scale(1.2);
        }
        100% {
            -webkit-transform: scale(1);
        }
    }
    */
</style>
