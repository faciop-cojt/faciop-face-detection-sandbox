<template>
  <div>
    <div class="video-wrapper">
      <video src="" id="face-video" ref="video"></video>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    let video = <HTMLVideoElement>this.$refs.video;
    this.$facemeshVideo.initVideoObject(video);

    video.onloadeddata = ev => {
      this.$facecanvas.setCanvasSize(video.width, video.height);
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
