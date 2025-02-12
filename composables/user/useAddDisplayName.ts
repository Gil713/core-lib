export const useAddDisplayName = () => {
  const { $userService } = useNuxtApp();
  const appStore = useAppStore();
  const { createToast } = useToast();
  const isAddDisplayNameProcessing = ref<boolean>(false);
  const isDisplayNameExist = ref<boolean>(false);

  const addDisplayNameFormSchema = createSchemaValidationBuilder()
    .buildDisplayNameSchema(appStore.currentUser?.username)
    .build();

  const addDisplayNameValidationSchema = toTypedSchema(addDisplayNameFormSchema);

  const addDisplayName = async (addDisplayNameFormValue: IUpdateInfoBody): Promise<boolean> => {
    isAddDisplayNameProcessing.value = true;
    try {
      await $userService.updateInfo(addDisplayNameFormValue);
      appStore.currentUser = Object.assign({}, appStore.currentUser, { fullname: addDisplayNameFormValue.fullname });
      return true;
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message,
      });
      return false;
    } finally {
      isAddDisplayNameProcessing.value = false;
    }
  };

  return {
    addDisplayName,
    isAddDisplayNameProcessing,
    isDisplayNameExist,
    addDisplayNameValidationSchema,
  };
};
