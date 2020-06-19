<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import TestCanvas from "./src/TestCanvas";

type DataType = {
  artwork: TestCanvas | null;
};

export default Vue.extend({
  // plugins: ['~/plugins/3DObjCanvas.ts'],
  plugins: ['../plugins/test-plugins'],

  data(): DataType {
    return {
      artwork: null
    };
  },
  mounted() {
    if(this.artwork == null) {
      this.artwork = new TestCanvas(<HTMLCanvasElement>this.$refs.canvas);
    }
  },
  created() {
    this.$sayHello("plugin function");
  }
});
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
