import { SnackbarService } from '~/plugins/snackbar';

export default () => {
  const { $snackbar } = useNuxtApp();

  return $snackbar as SnackbarService;
};
