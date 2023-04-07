<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';

definePageMeta({
  layout: 'auth',
});

const snackbar = useSnackbar();

const { signIn } = useAuth();

const validationSchema = toFormValidator(signInSchema);

const onSubmit = async (values: typeof signUpSchema._type) => {
  const { error, url } = await signIn(undefined, {
    username: values.username,
    password: values.password,
    redirect: false,
    callbackUrl: '/',
  });

  if (error) {
    snackbar.setMessage({
      message: error ?? 'Something went wrong',
      type: 'error',
    });
  } else {
    return navigateTo(url, { external: true });
  }
};
</script>

<template lang="pug">
.card.w-96.max-w-full.shadow-2xl.bg-base-100
  .card-body
    h3.text-3xl.text-center.font-black Sign In
    Form.flex.flex-col.gap-4.mt-6(
      v-slot='{ isSubmitting }'
      :validation-schema='validationSchema'
      @submit='onSubmit'
    )
      TextField(name='username' label='Username' type='text')
      TextField(name='password' label='Password' type='password')
      .form-control.mt-6
        button.btn.btn-primary.relative(:class='{ loading: isSubmitting }')
          span {{ isSubmitting ? '' : 'Sign In' }}
          Icon.absolute.right-4(
            name='material-symbols:arrow-forward-ios-rounded'
          )
    p.mt-6
      | Don't have an account?
      |
      NuxtLink.link.text-secondary(to='/auth/sign-up') Sign Up
</template>
