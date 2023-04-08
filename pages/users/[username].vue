<script lang="ts" setup>
import { Form } from 'vee-validate';
import { Post } from '@prisma/client';

definePageMeta({
  middleware: 'auth',
});

const route = useRoute();

const { data: session, signOut } = await useAuth();

const { data: user, error } = await useFetch(
  `/api/users/${route.params.username}`,
);

const { data: stats, refresh: refreshStats } = await useFetch(
  `/api/stats/${error.value ? session.value?.user.id : user.value?.id}`,
);

const { data: posts } = await useFetch(`/api/posts/${user.value?.id}`);

const onSignOut = async () => {
  await signOut({
    callbackUrl: '/auth/sign-in',
  });
};
</script>

<template lang="pug">
.w-full.flex.justify-center.items-start.pt-8
  StatsCard(:stats='stats')
  .w-full.px-8.flex.flex-col.gap-8.pb-8
    template(v-if='error?.statusCode === 404')
      h1.text-4xl.font-bold 404: User not found
      h2.text-xl.font-bold.text-center.mt-8 This user does not exist
      NuxtLink.btn.btn-primary.w-48.m-auto(to='/') Go Home
    template(v-else)
      h1.text-4xl.font-bold {{ user.name }}'s profile
      h2.text-xl.font-bold.text-center.mt-8(v-if='posts.length === 0') This user has no posts yet
      template(v-for='(post, index) in posts' :key='post?.id')
        PostCard(
          v-if='post'
          :session='session'
          v-model='posts[index]'
          @onDelete='refreshStats'
        )
  PopularCard
</template>
