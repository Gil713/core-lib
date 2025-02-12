const registerValidationSchema = toTypedSchema(
  createSchemaValidationBuilder().buildUsernameSchema().buildPasswordSchema().buildPhoneSchema().build(),
);

export const useRegister = () => {
  const { $userService } = useNuxtApp();

  const appStore = useAppStore();
  const { createToast } = useToast();
  // MKT tracking register action
  const { pushToDataLayer } = useDataLayer();

  const { resumeIntervalRefreshUserInfo } = useRefresh();
  const { initSystemData } = useSystemDataHandler();

  const isRegisterProcessing = ref<boolean>(false);
  const isUsernameExist = ref<boolean>(false);
  const registerErrorMessage = ref<string | undefined>();

  const route = useRoute();

  const registerUser = async (registerBody: IRegisterBody): Promise<boolean> => {
    pushToDataLayer(GmtTrackingEventEnum.FORM_SUBMITTED, IUserActionsType.REGISTER);
    let hasSucceeded = false;

    isRegisterProcessing.value = true;
    registerErrorMessage.value = undefined;
    isUsernameExist.value = false;

    try {
      const res = await $userService.registerUser({
        ...registerBody,
        back: (route.query.back as string) || undefined,
      });

      appStore.currentUser = res.data[0];
      resumeIntervalRefreshUserInfo();
      await initSystemData();

      if (res.data[0].redirect_url) {
        navigateTo(res.data[0].redirect_url, { external: true });
      }

      createToast({
        description: res.message,
      });

      hasSucceeded = true;
    } catch (error) {
      // User existed and whitelist issue is response code 400
      const err = error as INuxtCustomError;
      if (err.statusCode === 400) {
        isUsernameExist.value = true;
      }
      registerErrorMessage.value = err.message;

      createToast({
        variant: "destructive",
        description: registerErrorMessage.value,
      });
    } finally {
      isRegisterProcessing.value = false;
    }

    return hasSucceeded;
  };

  return {
    registerUser,
    isRegisterProcessing,
    isUsernameExist,
    registerErrorMessage,
    registerValidationSchema,
  };
};
