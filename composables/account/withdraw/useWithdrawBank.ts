export const useWithdrawBank = () => {
  const { $withdrawService } = useNuxtApp();

  const appStore = useAppStore();
  const { mappedUserBankList, currentUser } = storeToRefs(appStore);

  const { refreshUserInfo } = useRefresh();
  const { createToast } = useToast();

  const bankCodeSelected = ref<string | undefined>(undefined);
  const formWithdrawBank = reactive<IWithdrawBankBody>({
    amount_withdraw: 0,
    to_bank_code: "",
    to_bank_name: "",
    to_bank_no: "",
  });

  const withdrawBankFormSchema = computed(() => {
    const schema = createSchemaValidationBuilder()
      .buildAmountWithdrawBankSchema(currentUser.value?.balance || 0)
      .build();

    return toTypedSchema(schema);
  });

  const isWithdrawBankDisabled = computed<boolean>(() => {
    return Object.values(formWithdrawBank).some((value) => !value);
  });

  // initialize based on bankCodeSelected of bank dropdown
  const selectedBank = computed<IMappedUserBank | undefined>(() => {
    if (mappedUserBankList.value?.length) {
      if (bankCodeSelected.value) {
        return mappedUserBankList.value.find((bank: IMappedUserBank) => bank.bank_code === bankCodeSelected.value);
      }

      return mappedUserBankList.value[0];
    }

    return undefined;
  });

  const convertUnitToVND = computed(() =>
    formWithdrawBank.amount_withdraw
      ? `= ${formatVNDCurrency(formWithdrawBank.amount_withdraw * RATE_K_VND)}`
      : VND_EXCHANGE_RATE,
  );

  const submitFormWithdrawBank = async (): Promise<void> => {
    try {
      await $withdrawService.getWithdrawBank(formWithdrawBank);
      navigateTo(APP_PATH.TRANSACTION_HISTORY);
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

  // update formWithdrawBank when selectedBank changes
  watch(
    () => selectedBank.value,
    (bank: IMappedUserBank | undefined) => {
      formWithdrawBank.to_bank_code = bank?.bank_code || "";
      formWithdrawBank.to_bank_name = bank?.bank_account_name || "";
      formWithdrawBank.to_bank_no = bank?.bank_account_no || "";
    },
    { immediate: true },
  );

  onMounted(() => {
    if (mappedUserBankList.value?.length) {
      bankCodeSelected.value = mappedUserBankList.value[0].bank_code;
    }
  });

  return {
    bankCodeSelected,
    selectedBank,
    mappedUserBankList,
    formWithdrawBank,
    convertUnitToVND,
    isWithdrawBankDisabled,
    withdrawBankFormSchema,
    submitFormWithdrawBank,
  };
};
