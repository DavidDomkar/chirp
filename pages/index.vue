<script lang="ts" setup>
import { Form } from 'vee-validate';
import { Post } from '@prisma/client';

definePageMeta({
  middleware: 'auth',
});

const { data: session, signOut } = await useSession();

const { data: posts, pending, refresh } = await useFetch<Post[]>('/api/posts');

const onSignOut = async () => {
  await signOut({
    callbackUrl: '/auth/sign-in',
  });
};
</script>

<template lang="pug">
.w-full.px-8.flex.flex-col.gap-8
  h1.text-4xl.font-bold Welcome, {{ session.user.name }}!
  PostCard(@afterSubmit='refresh' :session='session')
  h2.text-2xl.font-bold(v-if="posts.length > 0") Latest Posts
  PostCard(
    v-for='post in posts'
    :key='post.id'
    :session='session'
    :post='post'
    @afterSubmit='refresh'
  )
</template>
