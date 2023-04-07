<script lang="ts" setup>
const { data: users, refresh: refreshPosts } = await useFetch(
  '/api/users/popular',
);
</script>

<template lang="pug">
.card.card-compact.shadow-2xl.bg-base-100.sticky.top-0.z-10(
  class='top-[112px] min-w-[300px]'
)
  .card-body.gap-4(class='!px-6 !pb-6')
    h2.card-title.text-2xl Popular Users
    .flex.items-center(
      v-for='user in users'
      :key='user.id'
      class='hover:bg-base-200 hover:cursor-pointer'
    )
      Avatar(:username='user.username')
      .flex-1.flex.flex-col
        h2.text-xl.font-bold.ml-2 {{ user.name }}
        h3.text-md.ml-2.text-gray-500 @{{ user.username }}
</template>
