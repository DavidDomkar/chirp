<script lang="ts" setup>
import { snackbarMessage } from '~~/plugins/snackbar';

const type = ref('error');
const timeout = shallowRef<NodeJS.Timeout>();

watchEffect(() => {
  if (snackbarMessage.value) {
    type.value = snackbarMessage.value.type ?? 'error';
    timeout.value && clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      snackbarMessage.value = undefined;
    }, 2000);
  }
});

const close = () => {
  snackbarMessage.value = undefined;
};
</script>

<template lang="pug">
TransitionScale(transform-origin='50% 0%')
  .alert.alert-error.shadow-lg.w-96.max-w-full.absolute.bottom-4(
    v-show='snackbarMessage'
    class=`inset-x-1/2 translate-x-[-50%] alert-${type}`
  )
    div
      Icon(name='ic:sharp-error-outline')
      span {{ snackbarMessage?.message }}
    Icon.alert-close.cursor-pointer(name='ic:baseline-close' @click='close')
</template>
