<template>
  <div>{{ vitePort }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const vitePort = ref(import.meta.env.VITE_PROXY)
    return {
      vitePort,
    }
  },
})
</script>
