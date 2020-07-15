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
    let video = <HTMLVideoElement>this.$refs.video;
    this.$facemeshVideo.initVideoObject(video);

    video.onloadeddata = ev => {
      this.$facecanvas.setCanvasSize(video.clientWidth, video.clientHeight);
      console.log("video width", video.clientWidth);
      
      this.loop(video);
    };
  },
  methods: {
    loop(video: HTMLVideoElement) {
      this.$facemeshProvider.getFacemeshPointsAsync(video)
      .then(prediction=>{
        this.$facecanvas.setFaceData(prediction[0]);
      })
      requestAnimationFrame(()=>this.loop(video))
    }
  }
});
</script>

<style lang="scss" scoped></style>
