<script lang="ts" setup>
defineProps<{
  username: string;
}>();
</script>

<template lang="pug">
.w-12
  img.rounded-lg(
    :src='`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,8e24aa,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300&backgroundType=gradientLinear`'
    :alt='`Avatar for ${username}`'
  )
</template>
