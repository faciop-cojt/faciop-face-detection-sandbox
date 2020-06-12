<template>
  <div>
    Hello, {{name}}
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