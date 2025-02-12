export const useCancelPromotion = () => {
  const { $userService } = useNuxtApp();

  const { createToast } = useToast();
  const { fetchDataOnDeposit } = useSystemDataHandler();
  const { refreshUserInfo } = useRefresh();

  const isLoadingSubmit = ref<boolean>(false);

  const submitCancelPromotion = async () => {
    try {
      isLoadingSubmit.value = true;

      const rs = await $userService.cancelPromotion();
      if (rs.status !== ResponseStatusEnum.OK) {
        createToast({ description: rs.message });
        return;
      }

      createToast({ description: "Hủy khuyến mãi thành công" });
      await Promise.allSettled([refreshUserInfo(), fetchDataOnDeposit()]);
    } catch (error: unknown) {
      createToast({ description: (error as Error).message });
    } finally {
      isLoadingSubmit.value = false;
    }
  };

  return {
    submitCancelPromotion,
    isLoadingSubmit,
  };
};
