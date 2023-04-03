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
  NewPostCard(@on-new-post='refresh')
  h2.text-2xl.font-bold Your Feed
  article.card.card-compact.shadow-2xl.bg-base-100(
    v-for='post in posts'
    :key='post.id'
  )
    .card-body
      .flex.items-center
        Avatar(:username='post.author.username')
        .flex.flex-col
          h2.text-xl.font-bold.ml-2 {{ post.author.name }}
          h3.text-md.ml-2.text-gray-500 @{{ post.author.username }}
      Form.mt-2
        textarea.textarea.textarea-bordered.resize-none.w-full.h-24(
          disabled
          class='!cursor-text'
          :value='post.content'
        )
</template>
