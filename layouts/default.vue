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
    .card.card-compact.shadow-2xl.rounded-t-none.bg-base-100.w-full.sticky.top-0.z-10(
      class='h-[80px]'
    )
      .card-body
        .flex.items-center
          .flex.items-center(class='min-w-[300px]')
            Logo(small)
          .w-full.px-4
            SearchField
          .flex.items-center.justify-end(class='min-w-[300px]')
            .btn.btn-primary(@click='onSignOut') Sign Out
    slot
</template>
