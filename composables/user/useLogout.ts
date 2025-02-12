export const useLogout = () => {
  const { $userService } = useNuxtApp();
  const appStore = useAppStore();
  const { createToast } = useToast();
  const isLogoutProcessing = ref<boolean>(false);
  const logOutError = ref<INuxtCustomError | undefined>();

  const logout = async (): Promise<void> => {
    isLogoutProcessing.value = true;
    logOutError.value = undefined;

    // reset store
    appStore.currentUser = undefined;
    appStore.systemPlan = undefined;
    appStore.systemDepositPayment = undefined;
    appStore.systemPhoneCardPayment = undefined;

    try {
      const logoutResponse = await $userService.logOut();

      createToast({
        description: logoutResponse.message,
      });
    } catch (error) {
      logOutError.value = error as INuxtCustomError;
      createToast({
        variant: "destructive",
        description: "Đăng xuất không thành công",
      });
    } finally {
      isLogoutProcessing.value = false;
    }
  };

  return {
    logout,
    isLogoutProcessing,
    logOutError,
  };
};
