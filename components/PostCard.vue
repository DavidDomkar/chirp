<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { FormActions } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { FetchError } from 'ofetch';
import { Post, User } from '@prisma/client';
import type { SessionData } from 'h3';

type PostCardModel = Post & {
  author: {
    name: string;
    username: string;
  };
  likes: {
    user: {
      name: string;
      username: string;
    };
  }[];
  dislikes: {
    user: {
      name: string;
      username: string;
    };
  }[];
};

const props = defineProps<{
  modelValue?: PostCardModel;
  session: SessionData;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', model?: PostCardModel): void;
  (e: 'onCreate'): void;
  (e: 'onDelete'): void;
}>();

const snackbar = useSnackbar();

const validationSchema = toFormValidator(postSchema);

const form = ref<FormActions<typeof postSchema._type>>();
const beforeEditingModel = ref<PostCardModel>();

const isEditting = computed(() => !!beforeEditingModel.value);

const isSubmittingLike = ref(false);
const isSubmittingDislike = ref(false);

const isLiked = computed(() => {
  if (!props.modelValue) return false;

  return props.modelValue.likes.some(
    (like) => like.user.username === props.session.user.username,
  );
});

const isDisliked = computed(() => {
  if (!props.modelValue) return false;

  return props.modelValue.dislikes.some(
    (dislike) => dislike.user.username === props.session.user.username,
  );
});

const onSubmit = async (
  values: typeof postSchema._type,
  { resetForm }: FormActions<typeof postSchema._type>,
) => {
  try {
    if (props.modelValue) {
      const editedPost = await $fetch(`/api/posts/${props.modelValue.id}`, {
        method: 'PATCH',
        body: {
          content: values.content,
        },
      });

      emit('update:modelValue', {
        ...editedPost,
        createdAt: new Date(editedPost.createdAt),
        updatedAt: new Date(editedPost.updatedAt),
        author: props.modelValue.author,
        likes: props.modelValue.likes,
        dislikes: props.modelValue.dislikes,
      });

      beforeEditingModel.value = undefined;

      resetForm();
    } else {
      const newPost = await $fetch('/api/posts', {
        method: 'POST',
        body: {
          content: values.content,
        },
      });

      emit('update:modelValue', {
        ...newPost,
        createdAt: new Date(newPost.createdAt),
        updatedAt: new Date(newPost.updatedAt),
        author: {
          name: props.session.user.name,
          username: props.session.user.username,
        },
        likes: [],
        dislikes: [],
      });

      emit('onCreate');

      resetForm();
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

const onEdit = () => {
  if (beforeEditingModel.value) {
    form.value?.resetForm({
      values: {
        content: beforeEditingModel.value.content,
      },
    });
    beforeEditingModel.value = undefined;
  } else {
    beforeEditingModel.value = props.modelValue;
  }
};

const onDelete = async () => {
  try {
    await $fetch(`/api/posts/${props.modelValue?.id}`, {
      method: 'DELETE',
    });

    emit('update:modelValue', undefined);

    emit('onDelete');
  } catch (error) {
    const { statusMessage } = error as FetchError;

    snackbar.setMessage({
      message: statusMessage ?? 'Something went wrong',
      type: 'error',
    });
  }
};

const onLike = async () => {
  if (!props.modelValue) return;

  isSubmittingLike.value = true;

  if (isLiked.value) {
    try {
      await $fetch(`/api/posts/${props.modelValue?.id}/likes`, {
        method: 'DELETE',
      });

      emit('update:modelValue', {
        ...props.modelValue,
        likes: props.modelValue.likes.filter(
          (like) => like.user.username !== props.session.user.username,
        ),
      });
    } catch (error) {
      const { statusMessage } = error as FetchError;

      snackbar.setMessage({
        message: statusMessage ?? 'Something went wrong',
        type: 'error',
      });
    }
  } else {
    try {
      await $fetch(`/api/posts/${props.modelValue?.id}/likes`, {
        method: 'POST',
      });

      emit('update:modelValue', {
        ...props.modelValue,
        likes: [
          ...props.modelValue.likes,
          {
            user: {
              name: props.session.user.name,
              username: props.session.user.username,
            },
          },
        ],
      });
    } catch (error) {
      const { statusMessage } = error as FetchError;

      snackbar.setMessage({
        message: statusMessage ?? 'Something went wrong',
        type: 'error',
      });
    }
  }

  isSubmittingLike.value = false;
};

const onDislike = async () => {
  if (!props.modelValue) return;

  isSubmittingDislike.value = true;

  if (isDisliked.value) {
    try {
      await $fetch(`/api/posts/${props.modelValue?.id}/dislikes`, {
        method: 'DELETE',
      });

      emit('update:modelValue', {
        ...props.modelValue,
        dislikes: props.modelValue.dislikes.filter(
          (dislike) => dislike.user.username !== props.session.user.username,
        ),
      });
    } catch (error) {
      const { statusMessage } = error as FetchError;

      snackbar.setMessage({
        message: statusMessage ?? 'Something went wrong',
        type: 'error',
      });
    }
  } else {
    try {
      await $fetch(`/api/posts/${props.modelValue?.id}/dislikes`, {
        method: 'POST',
      });

      emit('update:modelValue', {
        ...props.modelValue,
        dislikes: [
          ...props.modelValue.dislikes,
          {
            user: {
              name: props.session.user.name,
              username: props.session.user.username,
            },
          },
        ],
      });
    } catch (error) {
      const { statusMessage } = error as FetchError;

      snackbar.setMessage({
        message: statusMessage ?? 'Something went wrong',
        type: 'error',
      });
    }
  }

  isSubmittingDislike.value = false;
};
</script>

<template lang="pug">
article.card.card-compact.shadow-2xl.bg-base-100
  .card-body.flex.flex-col.gap-4
    .flex.items-center
      Avatar(
        :username='modelValue ? modelValue.author.username : session.user.username'
      )
      .flex.flex-col
        h2.text-xl.font-bold.ml-2 {{ modelValue ? modelValue.author.name : session.user.name }}
        h3.text-md.ml-2.text-gray-500 @{{ modelValue ? modelValue.author.username : session.user.username }}
      .flex-1
      .flex.gap-2.justify-end(
        v-if='modelValue && modelValue.authorId === session.user.id'
      )
        button.btn.btn-sm(
          @click='onEdit'
          :key='isEditting ? "edit" : "cancel"'
        )
          Icon(:name='isEditting ? "fa-solid:arrow-right" : "fa-solid:pen"')
        button.btn.btn-sm(v-if='!isEditting' @click='onDelete')
          Icon(name='fa-solid:trash-alt')
    Form.flex.flex-col.gap-4(
      ref='form'
      v-slot='{ isSubmitting, resetForm }'
      :initialValues='modelValue ? { content: modelValue.content } : {}'
      :validation-schema='validationSchema'
      @submit='onSubmit'
    )
      TextArea(
        name='content'
        placeholder='What\'s on your mind?'
        :disabled='modelValue && !isEditting'
      )
      .form-control(v-if='!modelValue || isEditting')
        button.btn.btn-sm.btn-primary.relative(
          :class='{ loading: isSubmitting }'
        )
          span {{ isSubmitting ? '' : isEditting ? 'Edit' : 'Post' }}
          Icon.absolute.right-2(
            name='material-symbols:arrow-forward-ios-rounded'
          )
    .flex.gap-2(v-if='modelValue && !isEditting')
      .form-control
        button.btn.btn-sm.flex.gap-2.btn-success.w-14(
          type='button'
          @click='onLike'
          class='disabled:text-success'
          :class='{ "!gap-0 loading": isSubmittingLike }'
          :disabled='modelValue.authorId === session.user.id || isDisliked || isSubmittingDislike'
        )
          Icon(v-if='!isSubmittingLike' name='fa:thumbs-o-up')
          span {{ modelValue.likes.length }}
      .form-control
        button.btn.btn-sm.flex.gap-2.btn-error.w-14(
          type='button'
          @click='onDislike'
          class='disabled:text-error'
          :class='{ "!gap-0 loading": isSubmittingDislike }'
          :disabled='modelValue.authorId === session.user.id || isLiked || isSubmittingLike'
        )
          Icon(v-if='!isSubmittingDislike' name='fa:thumbs-o-down')
          span {{ modelValue.dislikes.length }}
</template>
