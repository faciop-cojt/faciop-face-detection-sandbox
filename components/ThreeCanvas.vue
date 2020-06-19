<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import { BackgroudCanvas } from "../plugins/BackgroudCanvas";
import { log } from "three";

type DataType = {
  artwork: BackgroudCanvas | null;
};

export default Vue.extend({

  data(): DataType {
    return {
      artwork: null
    };
  },
  mounted() {
    if(this.artwork == null) {
      this.artwork = this.$backgroundCanvas;
      console.log(this.artwork);
      
      this.artwork.initRenderer(<HTMLCanvasElement>this.$refs.canvas);
      this.artwork.loop();
    }
  }
})
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>