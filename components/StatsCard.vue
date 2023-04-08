<script lang="ts" setup>
defineProps<{
  stats: {
    user: {
      name: string;
      username: string;
    };
    totalPosts: number;
    totalLikes: number;
    totalDislikes: number;
  };
}>();
</script>

<template lang="pug">
.stats.stats-vertical.shadow-2xl.bg-base-100.sticky.top-0.z-10(
  class='top-[112px] min-w-[300px] w-[300px]'
)
  .stat
    .stat-figure
      Avatar(:username='stats.user.username')
    .stat-value.text-2xl {{ stats.user.name }}
    NuxtLink.stat-title(:to='`/users/${stats.user.username}`' class='hover:underline') @{{ stats.user.username }}
  .stat
    .stat-figure
      Icon(name='material-symbols:post-add-rounded' size='32')
    .stat-value {{ stats.totalPosts }}
    .stat-title Total Posts
  .stat
    .stat-figure
      Icon.text-success(name='fa:thumbs-o-up' size='32')
    .stat-value.text-success {{ stats.totalLikes }}
    .stat-title Total Likes
  .stat
    .stat-figure
      Icon.text-error(name='fa:thumbs-o-down' size='32')
    .stat-value.text-error {{ stats.totalDislikes }}
    .stat-title Total Dislikes
</template>
