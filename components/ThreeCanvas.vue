<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted(){
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>this.$refs.canvas;
    this.$facecanvas.setCanvas(canvas);

    canvas.onloadeddata = event => {
      this.animationLoop();
    }
  },
  methods: {
    animationLoop() {
      this.$facecanvas.render();
      requestAnimationFrame(()=>this.animationLoop);
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