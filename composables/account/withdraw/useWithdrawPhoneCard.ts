export const useWithdrawCard = () => {
  const { $withdrawService } = useNuxtApp();

  const store = useAppStore();
  const { currentUser } = storeToRefs(store);

  const { createToast } = useToast();
  const { refreshUserInfo } = useRefresh();

  const {
    currentPhoneCardPaymentWImg,
    phoneCardPriceByProviderList,
    mappedSystemPhoneCardPaymentWImg,
    getPhoneCardPaymentStatus,
  } = usePhoneCardPaymentHandler();

  const cardQuantityDefault = ref<number>(0);
  const formWithdrawCard = reactive<IWithdrawCardBody>({
    card_amount_unit: 0,
    card_number: 0,
    to_telcom_code: currentPhoneCardPaymentWImg.systemPhoneCardProviderName,
  });

  const isWithdrawCardDisabled = computed<boolean>(() => {
    return !formWithdrawCard.card_amount_unit || !formWithdrawCard.card_number || isOverUserBalance.value;
  });

  const receivedAmount = computed<number>(() => {
    return formWithdrawCard.card_number * formWithdrawCard.card_amount_unit;
  });

  const isOverUserBalance = computed<boolean>(() => {
    return receivedAmount.value > (currentUser.value?.balance || 0) * RATE_K_VND;
  });

  const resetFormWithdrawCard = (): void => {
    formWithdrawCard.card_amount_unit = 0;
    formWithdrawCard.card_number = 0;
    cardQuantityDefault.value = 0;
  };

  const cardNetworksWithdraw = computed<IMappedSystemPhoneCardPaymentWImg[] | undefined>(() => {
    if (mappedSystemPhoneCardPaymentWImg.value === undefined || mappedSystemPhoneCardPaymentWImg.value === null) {
      return;
    }

    return mappedSystemPhoneCardPaymentWImg.value.filter(
      (network) => network.systemPhoneCardProviderName !== SystemPhoneCardPaymentNameEnum.ZING,
    );
  });

  const handleSelectCardNetwork = (network: IMappedSystemPhoneCardPaymentWImg): void => {
    Object.assign(mappedSystemPhoneCardPaymentWImg, network);
    formWithdrawCard.to_telcom_code = network.systemPhoneCardProviderName;
    resetFormWithdrawCard(); // reset form when changing network

    Object.assign(currentPhoneCardPaymentWImg, network);
    formWithdrawCard.to_telcom_code = network.systemPhoneCardProviderName;
  };

  const handleSelectAmount = (amount: number): void => {
    formWithdrawCard.card_amount_unit = amount;
    cardQuantityDefault.value = 1; // update default quantity to 1 when user selects a price
  };

  const submitFormWithdrawCard = async (): Promise<void> => {
    try {
      await $withdrawService.getWithdrawCard(formWithdrawCard);
      setTimeout(() => {
        navigateTo(APP_PATH.TRANSACTION_HISTORY);
      }, 500);
      createToast({
        description: "Phiếu rút đang được duyệt.",
      });
      await refreshUserInfo();
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message || "Rút tiền thất bại",
      });
    }
  };

  return {
    phoneCardPriceByProviderList,
    cardNetworksWithdraw,
    handleSelectAmount,
    handleSelectCardNetwork,
    formWithdrawCard,
    receivedAmount,
    isOverUserBalance,
    cardQuantityDefault,
    isWithdrawCardDisabled,
    submitFormWithdrawCard,
    getPhoneCardPaymentStatus,
  };
};
