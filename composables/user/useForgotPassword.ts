export const useForgotPassword = () => {
  const { $userService } = useNuxtApp();

  const { createToast } = useToast();

  const isSubmitForgotPassProcessing = ref<boolean>(false);

  const forgotPasswordFormSchema = createSchemaValidationBuilder().buildEmailSchema().build();
  const forgotPasswordValidationSchema = toTypedSchema(forgotPasswordFormSchema);

  const submitForgotPassword = async (forgotPassBody: IForgotPasswordBody): Promise<boolean> => {
    let hasSucceeded = false;

    isSubmitForgotPassProcessing.value = true;

    try {
      await $userService.verifyExistEmail(forgotPassBody);

      const forgotPasswordResponse = await $userService.forgotPassword(forgotPassBody);

      hasSucceeded = true;
      createToast({
        description: forgotPasswordResponse.message,
      });
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
    } finally {
      isSubmitForgotPassProcessing.value = false;
    }

    return hasSucceeded;
  };

  return {
    submitForgotPassword,
    isSubmitForgotPassProcessing,
    forgotPasswordValidationSchema,
  };
};
