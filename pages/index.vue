<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});

const { data, signOut, signIn, status } = useSession();

const onSignOut = async () => {
  await signOut({
    callbackUrl: '/auth/sign-in',
  });
};
</script>

<template lang="pug">
div {{ data }}
  button.btn.btn-primary(@click='onSignOut') Sign Out
</template>
