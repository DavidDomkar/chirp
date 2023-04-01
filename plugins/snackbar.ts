type SnackbarMessage = {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
};

export type SnackbarService = {
  setMessage: (message: SnackbarMessage) => void;
};

export const snackbarMessage = ref<SnackbarMessage>();

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      snackbar: {
        setMessage: (message: SnackbarMessage) => {
          snackbarMessage.value = message;
        },
      } as SnackbarService,
    },
  };
});
