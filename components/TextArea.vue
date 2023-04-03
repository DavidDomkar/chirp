<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';

defineProps<{
  name: string;
  placeholder: string;
}>();
</script>

<template lang="pug">
Field(
  :name='name'
  v-slot='{ field, errorMessage }'
  :validate-on-blur='false'
  :validate-on-change='false'
)
  textarea.textarea.textarea-bordered.resize-none.w-full.h-24(
    v-bind='field'
    :placeholder='placeholder'
    :class='`${errorMessage ? "border-error" : "focus:border-primary"} focus:!outline-none`'
  )
  label.label(v-if='errorMessage')
    ErrorMessage.label-text-alt.text-error(:name='name')
</template>
