<script lang="ts" setup>
import { Form } from 'vee-validate';
import { Post } from '@prisma/client';

definePageMeta({
  middleware: 'auth',
});

const route = useRoute();

const { data: results, refresh: refreshSearch } = await useFetch<{
  users: { id: string; username: string; name: string }[];
}>(() => '/api/search?q=' + route.query.q);

const { data: session, signOut } = await useAuth();

const { data: stats, refresh: refreshStats } = await useFetch(
  `/api/stats/${session.value!.user.id}`,
);

const users = computed(() => results.value?.users);
</script>

<template lang="pug">
.w-full.flex.justify-center.items-start.pt-8
  StatsCard.hidden(:stats='stats' class='md:block')
  .w-full.flex.flex-col.gap-8.pb-8(class='xl:pr-8 md:pl-8 mb-[52px]')
    h1.text-4xl.font-bold {{ users.length }} {{ users.length === 1 ? 'Result' : 'Results' }} found
    NuxtLink.card.card-compact.shadow-2xl.bg-base-100.transition-colors.duration-200(
      v-for='user in users'
      :key='user.username'
      :to='`/users/${user.username}`'
      class='hover:bg-base-300'
    )
      .card-body.flex-row.items-center.gap-0
        Avatar(:username='user.username')
        .flex-1.flex.flex-col
          h2.text-xl.font-bold.ml-2 {{ user.name }}
          h3.text-md.ml-2.text-gray-500 @{{ user.username }}
  PopularCard.hidden(class='xl:block')
</template>
