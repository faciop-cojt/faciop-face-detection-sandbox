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
  // plugins: ['~/plugins/TestPlugin.ts'],

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
    let t = this.$testPlugin.testPlugin("plugin");
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
