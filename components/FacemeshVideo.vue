<template>
  <div>
    <div class="video-wrapper">
      <video src="" id="face-video" ref="video"></video>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FacemeshVideo from '~/plugins/FacemeshVideoObject'

export default Vue.extend({
  data(){
    return { 
      facemesh_video: new FacemeshVideo
    }
  },
  mounted() {
    this.facemesh_video.initVideoObject(<HTMLVideoElement>this.$refs.video);
  }
})
</script>

<style lang="scss" scoped>

</style>