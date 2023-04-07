<script lang="ts" setup>
import { Form } from 'vee-validate';
import { Post } from '@prisma/client';

definePageMeta({
  middleware: 'auth',
});

const { data: session, signOut } = await useAuth();

const { data: stats } = await useFetch(`/api/stats/${session.value!.user.id}}`);

const { data: posts, pending, refresh } = await useFetch<Post[]>('/api/posts');

const onSignOut = async () => {
  await signOut({
    callbackUrl: '/auth/sign-in',
  });
};
</script>

<template lang="pug">
.w-full.flex.justify-center.items-start.pt-8
  StatsCard(:stats='stats')
  .w-full.px-8.flex.flex-col.gap-8
    h1.text-4xl.font-bold Welcome, {{ session.user.name }}!
    PostCard(:session='session' @update:modelValue='refresh')
    h2.text-2xl.font-bold(v-if='posts.length > 0') Latest Posts
    template(v-for='(post, index) in posts' :key='post?.id')
      PostCard(v-if='post' :session='session' v-model='posts[index]')
  .card.shadow-2xl.bg-base-100.sticky.top-0.z-10(
    class='top-[112px] min-w-[300px] h-[640px]'
  )
    .card-body
</template>
