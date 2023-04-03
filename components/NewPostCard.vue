<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { FormActions } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { FetchError } from 'ofetch';

const emit = defineEmits<{
  (e: 'onNewPost'): Promise<void>;
}>();

const { data: session } = await useSession();

const snackbar = useSnackbar();

const validationSchema = toFormValidator(createPostSchema);

const onSubmit = async (
  values: typeof createPostSchema._type,
  { resetForm }: FormActions<typeof createPostSchema._type>,
) => {
  try {
    await $fetch('/api/posts', {
      method: 'POST',
      body: {
        content: values.content,
      },
    });

    await emit('onNewPost');

    resetForm();
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
.card.card-compact.shadow-2xl.bg-base-100
  .card-body
    .flex.items-center
      Avatar(:username='session.user.username')
      .flex.flex-col
        h2.text-xl.font-bold.ml-2 {{ session.user.name }}
        h3.text-md.ml-2.text-gray-500 @{{ session.user.username }}
    Form.mt-2.flex.flex-col.gap-4(
      v-slot='{ isSubmitting, resetForm }'
      :validation-schema='validationSchema'
      @submit='onSubmit'
    )
      TextArea(name='content' placeholder='What\'s on your mind?')
      .form-control
        button.btn.btn-sm.btn-primary.relative(
          :class='{ loading: isSubmitting }'
        )
          span {{ isSubmitting ? '' : 'Post' }}
          Icon.absolute.right-2(
            name='material-symbols:arrow-forward-ios-rounded'
          )
</template>
