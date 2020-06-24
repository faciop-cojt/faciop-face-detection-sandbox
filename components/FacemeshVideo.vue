<template>
  <div>
    <div class="video-wrapper">
      <video src="" id="face-video" ref="video"></video>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FacemeshVideo } from "~/plugins/FacemeshVideoObject";
import { FacemeshProvider } from "~/plugins/FacemeshProvider";

export default Vue.extend({
  data() {
    return {
      facemesh_video: new FacemeshVideo()
    };
  },
  mounted() {
    this.facemesh_video.initVideoObject(<HTMLVideoElement>this.$refs.video);
    this.loop();
  },
  methods: {
    loop(){
      if(this.facemesh_video.inited){
        this.$facemeshProvider.getFacemeshPoints(<HTMLVideoElement>this.$refs.video)
      }else{
        requestAnimationFrame(this.loop)
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
