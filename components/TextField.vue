<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';

defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}>();
</script>

<template lang="pug">
Field(:name='name' v-slot='{ field, errorMessage }')
  .form-control
    label.label
      span.label-text(:class='{ "text-error": errorMessage }') {{ label }}
    input.input.input-bordered(
      v-bind='field'
      :type='type ?? "text"'
      :placeholder='placeholder ?? label'
      :class='`${errorMessage ? "input-error" : "focus:input-primary"} focus:!outline-none`'
    )
    label.label(v-if='errorMessage')
      ErrorMessage.label-text-alt.text-error(:name='name')
</template>
