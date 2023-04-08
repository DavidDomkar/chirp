<script lang="ts" setup>
defineProps<{
  small?: boolean;
}>();
</script>

<template lang="pug">
h1.font-display.text-8xl.text-transparent.bg-clip-text.leading-tight.bg-gradient-to-r.from-primary.to-secondary(
  v-if='!small'
  class='sm:text-9xl sm:leading-tight'
) CHIRP
h1.font-display.text-4xl.text-transparent.bg-clip-text.leading-tight.bg-gradient-to-r.from-primary.to-secondary(
  v-if='small'
)
  NuxtLink(to='/') CHIRP
</template>
