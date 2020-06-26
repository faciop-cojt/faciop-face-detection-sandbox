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
import { log } from "@tensorflow/tfjs-core";

export default Vue.extend({
  data() {
    return {
      facemesh_video: new FacemeshVideo()
    };
  },
  mounted() {
    this.facemesh_video.initVideoObject(<HTMLVideoElement>this.$refs.video);
    this.$refs.video.addEventListener('loadeddata', (event)=>{
      this.loop();
    })
  },
  methods: {
    loop(){
      this.$facemeshProvider.getFacemeshPointsAsync(<HTMLVideoElement>this.$refs.video)
      .then(predictions =>{
        this.$nuxt.$emit('updateFacemesh', predictions[0].scaledMesh)
        requestAnimationFrame(this.loop)
      })
    }
  }
});
</script>

<style lang="scss" scoped></style>
