import { useSubmitCount } from "vee-validate";

export const useDepositCard = () => {
  const { $depositService } = useNuxtApp();

  const { createToast } = useToast();

  const {
    currentPhoneCardPaymentWImg,
    phoneCardPriceByProviderList,
    mappedSystemPhoneCardPaymentWImg,
    getPhoneCardPaymentStatus,
  } = usePhoneCardPaymentHandler();

  enum ActionOnFieldNEnum {
    SERIAL = "card_serial",
    CODE = "card_code",
  }

  const submittedCount = useSubmitCount();
  const depositCardForm = reactive<IDepositPhoneCardBody>({
    card_amount: 0,
    card_code: "",
    card_serial: "",
    to_telcom_code: currentPhoneCardPaymentWImg.systemPhoneCardProviderName,
  });

  const depositCardFormSchema = computed(() => {
    const schema = createSchemaValidationBuilder()
      .buildCardSerialSchema(depositCardForm.to_telcom_code)
      .buildCardCodeSchema(depositCardForm.to_telcom_code)
      .build();

    return toTypedSchema(schema);
  });

  const systemPhoneCardPaymentFee = computed<number>(() => {
    return Math.round((1 - (currentPhoneCardPaymentWImg.systemPhoneCardPaymentInfo.rate || 0)) * 100);
  });

  const isDepositCardDisabled = computed<boolean>(() => {
    return Object.values(depositCardForm).some((value) => !value);
  });

  const handlePasteContent = async (fieldName: ActionOnFieldNEnum) => {
    const clipboardData = await navigator.clipboard.readText();
    return depositCardForm.to_telcom_code === SystemPhoneCardPaymentNameEnum.ZING
      ? clipboardData
          .replace(/\s/g, "")
          .substring(0, fieldName === ActionOnFieldNEnum.SERIAL ? CARD_SERIAL_LENGTH.MAX : CARD_CODE_LENGTH.MAX)
      : clipboardData
          .replace(/\s/g, "")
          .replace(/[^0-9]/g, "")
          .substring(0, fieldName === ActionOnFieldNEnum.SERIAL ? CARD_SERIAL_LENGTH.MAX : CARD_CODE_LENGTH.MAX);
  };

  const handleActionCardSerial = async (setValue: (value: string, shouldValidate?: boolean) => void) => {
    if (depositCardForm.card_serial) {
      // action delete
      depositCardForm.card_serial = "";
      setValue("", submittedCount.value > 0);
    } else {
      // action paste
      const value = await handlePasteContent(ActionOnFieldNEnum.SERIAL);
      depositCardForm.card_serial = value;
      setValue(value, submittedCount.value > 0);
    }
  };

  const handleActionCardCode = async (setValue: (value: string, shouldValidate?: boolean) => void) => {
    if (depositCardForm.card_code) {
      // action delete
      depositCardForm.card_code = "";
      setValue("", submittedCount.value > 0);
    } else {
      // action paste
      const value = await handlePasteContent(ActionOnFieldNEnum.CODE);
      depositCardForm.card_code = value;
      setValue(value, submittedCount.value > 0);
    }
  };

  const resetFormDepositCard = () => {
    depositCardForm.card_amount = 0;
    depositCardForm.card_code = "";
    depositCardForm.card_serial = "";
  };

  const handleSelectCardNetwork = (selectedPhoneCard: IMappedSystemPhoneCardPaymentWImg) => {
    if (currentPhoneCardPaymentWImg.systemPhoneCardProviderName !== selectedPhoneCard.systemPhoneCardProviderName) {
      resetFormDepositCard(); // reset data when changing selectedPhoneCard
    }
    Object.assign(currentPhoneCardPaymentWImg, selectedPhoneCard);
    depositCardForm.to_telcom_code = selectedPhoneCard.systemPhoneCardProviderName;
  };

  const submitFormDepositCard = async () => {
    try {
      await $depositService.sendDepositCardRequest(depositCardForm);
      // Todo chalamet update use createSharedComposable
      setTimeout(() => {
        navigateTo(APP_PATH.TRANSACTION_HISTORY);
      }, 500);
      createToast({
        description: "Tạo phiếu nạp thành công.",
      });
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message || "Nạp tiền thất bại",
      });
    }
  };

  return {
    systemPhoneCardPaymentFee,
    phoneCardPriceByProviderList,
    currentPhoneCardPaymentWImg,
    mappedSystemPhoneCardPaymentWImg,
    handleSelectCardNetwork,
    depositCardForm,
    depositCardFormSchema,
    isDepositCardDisabled,
    handleActionCardCode,
    handleActionCardSerial,
    submitFormDepositCard,
    getPhoneCardPaymentStatus,
  };
};
