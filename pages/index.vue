<script lang="ts" setup>
import { Post } from '@prisma/client';

definePageMeta({
  middleware: 'auth',
});

const { data: posts, pending, refresh } = await useFetch<Post[]>('/api/posts');

const { data, signOut, signIn, status } = useSession();

const onSignOut = async () => {
  await signOut({
    callbackUrl: '/auth/sign-in',
  });
};
</script>

<template lang="pug">
.w-full.px-8.flex.flex-col.gap-8
  NewPostCard(@on-new-post='refresh')
  article.card.card-compact.shadow-2xl.bg-base-100(
    v-for='post in posts'
    :key='post.id'
  )
    .card-body
      h2.text-xl.font-bold {{ post.author.name }}
      Form(:validation-schema='validationSchema' @submit='onSubmit')
        textarea.textarea.textarea-bordered.resize-none.w-full.h-24(
          disabled
          :value='post.content'
        )
</template>
