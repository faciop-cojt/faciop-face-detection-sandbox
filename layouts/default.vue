<template>
  <div>
    <div id="canvas-wrapper"><three-canvas /></div>
    <div id="nuxt-proj-wrapper">
      <facemesh-video />
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ThreeCanvas from '~/components/ThreeCanvas.vue'
import FacemeshVideo from '@/components/FacemeshVideo.vue'

export default Vue.extend({
  components: {
    ThreeCanvas,
    FacemeshVideo
  }
});
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

#canvas-wrapper {
  position: relative;
  z-index: 2;
}

#nuxt-proj-wrapper {
  position: relative;
  z-index: 1;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
