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
  data(): DataType {
    return {
      artwork: null
    };
  },
  mounted() {
    if(!this.artwork){
      this.artwork = new TestCanvas(<HTMLCanvasElement>this.$refs.canvas);
    }
  }
});
</script>
