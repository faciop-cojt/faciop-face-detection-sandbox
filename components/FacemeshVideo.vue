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
    (<HTMLVideoElement>this.$refs.video).onloadeddata = ev => {};
  }
});
</script>

<style lang="scss" scoped></style>
