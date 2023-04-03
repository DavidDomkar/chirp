<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';

withDefaults(
  defineProps<{
    name: string;
    placeholder: string;
    value?: string;
    disabled?: boolean;
  }>(),
  {
    value: undefined,
    disabled: false,
  },
);
</script>

<template lang="pug">
Field(
  :name='name'
  :value='value'
  v-slot='{ field, errorMessage }'
  :validate-on-blur='false'
  :validate-on-change='false'
)
  .form-control
    textarea.textarea.textarea-bordered.resize-none.w-full.h-24(
      v-bind='field'
      :placeholder='placeholder'
      :class='`${errorMessage ? "border-error" : "focus:border-primary"} focus:!outline-none !cursor-text`'
      :disabled='disabled'
    )
    label.label(v-if='errorMessage')
      ErrorMessage.label-text-alt.text-error(:name='name')
</template>
