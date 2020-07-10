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
      this.$video_ready(<HTMLVideoElement>this.$refs.video);
      this.loop(video);
    };
  },
  methods: {
    loop(video: HTMLVideoElement) {
      this.$facemeshProvider.getFacemeshPointsAsync(video)
      .then(prediction=>{
        this.$facecanvas.setFaceData(prediction[0]);
        this.$facecanvas.render();
      })
      requestAnimationFrame(()=>this.loop(video))
    }
  }
});
</script>

<style lang="scss" scoped></style>
