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
    .w-full.flex.justify-center.items-start.pt-8
      .stats.stats-vertical.shadow-2xl.bg-base-100.sticky.top-0.z-10(
        class='top-[112px] min-w-[300px]'
      )
        .stat
          .stat-figure
            Avatar(:username='session.user.username')
          .stat-value.text-2xl {{ session.user.name }}
          .stat-title @{{ session.user.username }}
        .stat
          .stat-figure
            Icon(name='material-symbols:post-add-rounded' size='32')
          .stat-value 20
          .stat-title Total Posts
        .stat
          .stat-figure
            Icon.text-success(name='fa:thumbs-o-up' size='32')
          .stat-value.text-success 53
          .stat-title Total Likes
        .stat
          .stat-figure
            Icon.text-error(name='fa:thumbs-o-down' size='32')
          .stat-value.text-error 5
          .stat-title Total Dislikes
      slot
      .card.shadow-2xl.bg-base-100.sticky.top-0.z-10(
        class='top-[112px] min-w-[300px] h-[640px]'
      )
        .card-body
</template>
