<script lang="ts" setup>
defineProps<{
  error: any;
}>();
</script>

<template lang="pug">
.flex.justify-center.bg-base-300
  .max-w-full.min-h-screen.flex.flex-col.justify-center.px-8(class='w-[1344px]')
    .w-full.flex.flex-col.items-center.py-8.gap-8
      h1.text-4xl.font-bold.text-center {{ error.statusCode }}
      h2.text-xl.font-bold.text-center {{ error.message }}
      NuxtLink.btn.btn-primary.w-48.m-auto(to='/') Go Home
    Footer
</template>
