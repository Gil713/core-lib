const REFRESH_INTERVAL = 20000;

// This composable use in SPA only
export const useRefresh = createSharedComposable(() => {
  const { $systemService } = useNuxtApp();
  const appStore = useAppStore();
  const { createToast } = useToast();

  const isLoading = ref<boolean>(false);

  const isLoggedIn = computed(() => !!appStore.currentUser);

  const refreshUserInfo = async (): Promise<boolean> => {
    try {
      isLoading.value = true;
      const data = await $systemService.refreshUserInfo({
        bypassErrorToast: !!appStore.currentUser,
      });
      if (data) {
        appStore.currentUser = data;
      }
      return true;
    } catch (error: unknown) {
      const statusCode = (error as INuxtCustomError).statusCode;
      if (statusCode === 401) {
        createToast({
          variant: "destructive",
          description: "Phiên đăng nhập đã hết hạn hoặc được đăng nhập ở thiết bị khác.",
        });

        appStore.currentUser = undefined;

        // Redirect to home page if not in home page
        if (useRoute().path !== APP_PATH.HOME) {
          navigateTo(APP_PATH.HOME, { replace: true });
        }
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const {
    pause: pauseIntervalRefreshUserInfo,
    resume: resumeIntervalRefreshUserInfo,
    isActive: isActiveIntervalRefreshUserInfo,
  } = useIntervalFn(
    async () => {
      if (isLoading.value) {
        return;
      }
      const hasRefreshToken = await refreshUserInfo();
      if (!hasRefreshToken && isActiveIntervalRefreshUserInfo.value) {
        pauseIntervalRefreshUserInfo();
      }
    },
    useToNumber(REFRESH_INTERVAL).value,
    { immediate: false },
  );

  return {
    isLoading,
    isLoggedIn,
    refreshUserInfo,
    resumeIntervalRefreshUserInfo,
    pauseIntervalRefreshUserInfo,
    isActiveIntervalRefreshUserInfo,
  };
});
