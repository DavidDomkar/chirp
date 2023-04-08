<script lang="ts" setup>
const { data: session, signOut } = await useAuth();

const onSignOut = async () => {
  await signOut({
    callbackUrl: '/auth/sign-in',
  });
};
</script>

<template lang="pug">
.flex.justify-center.bg-base-300
  .max-w-full.min-h-screen.flex.flex-col.px-8(class='w-[1344px]')
    AppBar
    slot
</template>
