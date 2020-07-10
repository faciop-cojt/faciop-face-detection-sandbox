<template>
  <div>
    <div class="video-wrapper">
      <video src="" id="face-video" ref="video"></video>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { log } from "@tensorflow/tfjs-core";
export default Vue.extend({
  mounted() {

    this.$facemeshVideo.initVideoObject(<HTMLVideoElement>this.$refs.video);
    
    (<HTMLVideoElement>this.$refs.video).onloadeddata = ev => {
      console.log("Helloooooooooooooooooooooooo");
      
    };
  }
});
</script>

<style lang="scss" scoped></style>
