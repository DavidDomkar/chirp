<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';

const validationSchema = toFormValidator(searchSchema);

const onSubmit = (values: typeof searchSchema._type) => {
  navigateTo(`/search?q=${values.q}`);
};
</script>

<template lang="pug">
Form(:validation-schema='validationSchema' @submit='onSubmit')
  .form-control
    .input-group
      Field.input.input-bordered.w-full(
        name='q'
        type='text'
        placeholder='Search people...'
        class='focus:input-primary focus:!outline-none'
      )
      button.btn.btn-primary.btn-square
        Icon(name='fa-solid:search')
</template>
