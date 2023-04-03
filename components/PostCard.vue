<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { FormActions } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { FetchError } from 'ofetch';
import { Post } from '@prisma/client';
import type { SessionData } from 'h3';

const props = defineProps<{
  post?: Post;
  session: SessionData;
}>();

const emit = defineEmits<{
  (e: 'afterSubmit'): Promise<void>;
}>();

const editing = ref(false);

const snackbar = useSnackbar();

const validationSchema = toFormValidator(postSchema);

const onSubmit = async (
  values: typeof postSchema._type,
  { resetForm }: FormActions<typeof postSchema._type>,
) => {
  try {
    if (props.post) {
      await $fetch(`/api/posts/${props.post.id}`, {
        method: 'PATCH',
        body: {
          content: values.content,
        },
      });

      editing.value = false;
    } else {
      await $fetch('/api/posts', {
        method: 'POST',
        body: {
          content: values.content,
        },
      });

      resetForm();

      await emit('afterSubmit');
    }

    return;
  } catch (error) {
    const { statusMessage } = error as FetchError;

    snackbar.setMessage({
      message: statusMessage ?? 'Something went wrong',
      type: 'error',
    });
  }
};

const onDelete = async () => {
  try {
    await $fetch(`/api/posts/${props.post?.id}`, {
      method: 'DELETE',
    });

    await emit('afterSubmit');
  } catch (error) {
    const { statusMessage } = error as FetchError;

    snackbar.setMessage({
      message: statusMessage ?? 'Something went wrong',
      type: 'error',
    });
  }
};
</script>

<template lang="pug">
article.card.card-compact.shadow-2xl.bg-base-100
  .card-body.flex.flex-col.gap-4
    .flex.items-center
      Avatar(:username='post ? post.author.username : session.user.username')
      .flex.flex-col
        h2.text-xl.font-bold.ml-2 {{ post ? post.author.name : session.user.name }}
        h3.text-md.ml-2.text-gray-500 @{{ post ? post.author.username : session.user.username }}
      .flex-1
      .flex.justify-end(v-if='post && post.authorId === session.user.id')
        button.btn.btn-sm(@click='editing = !editing')
          Icon(name='fa:edit')
        button.btn.btn-sm(@click='onDelete')
          Icon(name='fa:trash')
    Form.flex.flex-col.gap-4(
      v-slot='{ isSubmitting, resetForm }'
      :validation-schema='validationSchema'
      @submit='onSubmit'
    )
      TextArea(
        name='content'
        placeholder='What\'s on your mind?'
        :disabled='post && !editing'
        :value='post?.content'
      )
      .form-control(v-if='!post || editing')
        button.btn.btn-sm.btn-primary.relative(
          :class='{ loading: isSubmitting }'
        )
          span {{ isSubmitting ? '' : editing ? 'Edit' : 'Post' }}
          Icon.absolute.right-2(
            name='material-symbols:arrow-forward-ios-rounded'
          )
    .flex.gap-2(v-if='post && !editing')
      .form-control
        button.btn.btn-sm.flex.gap-2.btn-success(type='button')
          Icon(name='fa:thumbs-o-up')
          span 1
      .form-control
        button.btn.btn-sm.flex.gap-2.btn-error(type='button')
          Icon(name='fa:thumbs-o-down')
          span 2
</template>
