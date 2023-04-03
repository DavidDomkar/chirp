<script lang="ts" setup>
import { Form } from 'vee-validate';
import { Post } from '@prisma/client';

definePageMeta({
  middleware: 'auth',
});

const { data: posts, pending, refresh } = await useFetch<Post[]>('/api/posts');

const { signOut } = useSession();

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
