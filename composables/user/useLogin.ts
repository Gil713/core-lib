export const useLogin = () => {
  const { $userService } = useNuxtApp();

  const appStore = useAppStore();
  const { createToast } = useToast();
  const { pushToDataLayer } = useDataLayer();

  const { resumeIntervalRefreshUserInfo } = useRefresh();
  const { initSystemData } = useSystemDataHandler();
  const route = useRoute();

  const isLogInProcessing = ref<boolean>(false);
  const logInError = ref<INuxtCustomError | undefined>();

  const loginFormSchema = createSchemaValidationBuilder().buildUsernameSchema().buildPasswordSchema().build();
  const loginValidationSchema = toTypedSchema(loginFormSchema);

  const logIn = async (loginBody: ILoginBody): Promise<boolean> => {
    // MKT tracking login action
    pushToDataLayer(GmtTrackingEventEnum.FORM_SUBMITTED, IUserActionsType.LOGIN);

    let hasSucceeded = false;
    isLogInProcessing.value = true;
    logInError.value = undefined;

    try {
      const res = await $userService.logIn({
        ...loginBody,
        back: (route.query.back as string) || undefined,
      });

      appStore.currentUser = res.data[0];
      resumeIntervalRefreshUserInfo();
      await initSystemData();

      hasSucceeded = true;

      if (res.data[0].redirect_url) {
        navigateTo(res.data[0].redirect_url, { external: true });
      }

      createToast({
        description: res.message,
      });

      // Redirect to the page that user wants to open before login. In case the user clicks the button from the promotion page.
      // If there is no page to open, redirect to the home page.
      const openUrl = useRoute().query.openUrl as string;
      if (openUrl) {
        navigateTo(openUrl, { replace: true });
      }
    } catch (error) {
      logInError.value = error as INuxtCustomError;

      createToast({
        variant: "destructive",
        description: logInError.value.message,
      });
    } finally {
      isLogInProcessing.value = false;
    }

    return hasSucceeded;
  };

  return {
    logIn,
    isLogInProcessing,
    logInError,
    loginValidationSchema,
  };
};
