<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import { BackgroudCanvas } from "../plugins/BackgroudCanvas";
import { log } from "three";

import * as facemesh from '@tensorflow-models/facemesh'

type DataType = {
  artwork: BackgroudCanvas | null;
};

export default Vue.extend({

  data(): DataType {
    return {
      artwork: null
    };
  },
  created() {
    this.$nuxt.$on('updateFacemesh', this.updateFacemesh)
  },
  mounted() {
    if(this.artwork == null) {
      this.artwork = this.$backgroundCanvas;
      console.log(this.artwork);
      
      this.artwork.initRenderer(<HTMLCanvasElement>this.$refs.canvas);
      this.artwork.loop();
    }
  },
  methods: {
    updateFacemesh(predictions) {
      console.log(predictions);
      
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