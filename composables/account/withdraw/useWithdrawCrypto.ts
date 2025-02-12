type IFormData = {
  amount: string;
  currency: string;
  network: string;
  wallet_address: string | undefined;
  ex_rate: string;
};

export const useWithdrawCrypto = () => {
  const { $systemService } = useNuxtApp();
  const store = useAppStore();
  const { createToast } = useToast();
  const { currentUser, systemDepositPayment, systemPlan, hasJoinPromotion, amountRolling } = storeToRefs(store);
  const cryptoNetwork = ref<ICryptoV2SysDepositPaymentMethod | undefined>(undefined);
  const amountWithdraw = ref<number>(0);

  const formData = reactive<IFormData>({
    amount: "",
    currency: "",
    network: "",
    wallet_address: "",
    ex_rate: "",
  });

  const availableBalance = computed(() => currentUser.value?.balance);

  const schema = createSchemaValidationBuilder()
    .buildAmountWithdrawCryptoSchema(availableBalance.value || 0)
    .buildWalletAddressWithdrawCryptoSchema()
    .build();
  const withdrawCryptoValidationSchema = toTypedSchema(schema);

  const amountApproximate = computed(() => {
    return (amountWithdraw.value! * RATE_K_VND) / cryptoNetwork.value!.sell_price;
  });

  const approximateAmount = computed(() => {
    return amountWithdraw.value > 0 && cryptoNetwork.value?.sell_price
      ? `= ${Number(amountApproximate.value).toFixed(4)} USDT`
      : cryptoNetwork.value?.sell_price
        ? `1 K = ${(RATE_K_VND / cryptoNetwork.value.sell_price).toFixed(4)} USDT`
        : "";
  });

  const currencies = computed(() => {
    return systemDepositPayment.value?.crypto_v2.map((item: ICryptoV2SysDepositPaymentMethod) => {
      return {
        ...item,
        wallet_address: "",
      };
    });
  });

  const submitFormWithdraw = async () => {
    try {
      formData.amount = (amountWithdraw.value! * RATE_K_VND).toString();
      await $systemService.withdrawCrypto(formData);
      createToast({
        description: "Rút tiền thành công",
      });
      // Todo chalamet update use createSharedComposable
      setTimeout(() => {
        navigateTo(APP_PATH.TRANSACTION_HISTORY);
      }, 500);
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message,
      });
    }
  };

  const changeCryptoNetwork = (crypto: ICryptoV2SysDepositPaymentMethod) => {
    cryptoNetwork.value = crypto;
    formData.currency = cryptoNetwork.value.token;
    formData.network = cryptoNetwork.value.network[0];
    formData.ex_rate = cryptoNetwork.value.sell_price.toString();
    if (formData.wallet_address) {
      formData.wallet_address = undefined;
    }
    amountWithdraw.value = 0;
  };

  useAsyncData("init-crypto-network", async () => {
    return changeCryptoNetwork(currencies.value?.[0] as ICryptoV2SysDepositPaymentMethod);
  });
  const handlePaste = async (setValue: (value: unknown) => void) => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      formData.wallet_address = clipboardText;
      setValue(clipboardText);
    } catch (error) {
      useLogError(error);
    }
  };

  const handleClear = (setValue: (value: unknown) => void) => {
    setValue("");
    formData.wallet_address = undefined;
  };

  return {
    formData,
    handlePaste,
    handleClear,
    currencies,
    changeCryptoNetwork,
    amountWithdraw,
    approximateAmount,
    cryptoNetwork,
    withdrawCryptoValidationSchema,
    availableBalance,
    submitFormWithdraw,
    systemPlan,
    hasJoinPromotion,
    amountRolling,
  };
};
