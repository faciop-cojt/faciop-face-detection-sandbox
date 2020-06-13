<template>
  <div>
    Hello, {{name}}
    <nuxt-link to="/">to index page </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: "ninisan"
    }
  }
})
</script>