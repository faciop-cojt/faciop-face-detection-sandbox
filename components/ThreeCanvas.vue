<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      msg: "hello"
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