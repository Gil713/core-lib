import dayjs from "dayjs";

type IDepositCodepayForm = {
  amount: number;
  package_id: number;
};

const COUNTDOWN_CREATE_TRANSACTION = 60;
const PREFIX_KEY_COOKIE_NICEPAY = "deposit";

export default function useAccountDepositCodepay() {
  const { $depositService, $transactionHistoryService } = useNuxtApp();

  const depositCodepayFormSchema = createSchemaValidationBuilder()
    .buildAmountDepositSchema()
    .buildPackageDepositSchema()
    .build();

  const depositCodepayValidationSchema = toTypedSchema(depositCodepayFormSchema);

  const appStore = useAppStore();
  const { createToast } = useToast();

  const {
    isUserBankAvailable,
    mappedPackages: promotionPackages,
    isCommissionPackage,
    currentUser,
  } = storeToRefs(appStore);

  const { fetchDataOnDeposit } = useSystemDataHandler();

  const keySaveCookie = computed(() => `${PREFIX_KEY_COOKIE_NICEPAY}_${currentUser.value?.username}`);

  const AMOUNT_FIELD_RULE = {
    MAX: 8,
  };

  const currentDepositStep = ref<number>(1);
  const isFetchTransaction = ref<boolean>(false);

  const formDepositValues = reactive<IDepositCodepayForm>({
    amount: 0,
    package_id: promotionPackages.value?.[0]?.id ?? 0,
  });

  const detailDeposit = reactive<IDepositCodePay & { timeLeft?: Date; timeLeftCreateNewInvoice?: Date }>({
    invoice_id: 0,
    amount: 0,
    code: "",
    bank_code: "",
    bank_name: "",
    account_no: "",
    account_name: "",
    expired_at: new Date(),
    created_at: new Date(),
    failed: 0,
    package_id: 0,
    qrcode_url: "",
    timeLeft: new Date(),
    timeLeftCreateNewInvoice: new Date(),
  });

  const viewDetailDeposit = computed(() => [
    {
      label: "Ngân hàng",
      value: detailDeposit.bank_name?.toUpperCase(),
      isCopy: false,
    },
    {
      label: "Số tài khoản",
      value: detailDeposit.account_no,
      isCopy: true,
    },
    {
      label: "Người nhận",
      value: detailDeposit.account_name?.toUpperCase(),
      isCopy: true,
    },
    {
      label: "Số tiền",
      value: formatVNDCurrency(detailDeposit.amount),
      isCopy: true,
    },
    {
      label: "Nội dung chuyển tiền",
      value: detailDeposit.code,
      isCopy: true,
    },
  ]);

  const convertUnitToVND = computed(() =>
    formDepositValues.amount ? `= ${formatVNDCurrency(formDepositValues.amount * RATE_K_VND)}` : VND_EXCHANGE_RATE,
  );

  const createNewDepositInvoice = async (isKeepValue: boolean = false) => {
    const cookie = useCookie(keySaveCookie.value);
    cookie.value = undefined;
    if (!isKeepValue) {
      formDepositValues.amount = 0;
      formDepositValues.package_id = promotionPackages.value?.[0]?.id ?? 0;
    }
    formDepositValues.amount = 0;
    formDepositValues.package_id = promotionPackages.value?.[0]?.id ?? 0;
    pauseIntervalTransaction();
    prevStep();
  };

  const fetchTransactionSuccess = async () => {
    try {
      isFetchTransaction.value = true;
      const data = await $transactionHistoryService.lastSuccessTransactionHistory({
        method: "nicepay",
        bank_trancode: detailDeposit.code,
      });
      if (data !== null) {
        pauseIntervalTransaction();
        createNewDepositInvoice();
        await fetchDataOnDeposit();
      }
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
    } finally {
      isFetchTransaction.value = false;
    }
  };

  const {
    pause: pauseIntervalTransaction,
    resume: resumeIntervalTransaction,
    isActive: isActiveIntervalTransaction,
  } = useIntervalFn(
    async () => {
      if (isFetchTransaction.value) {
        return;
      }
      await fetchTransactionSuccess();
    },
    HISTORY_SUCCESS_INTERVAL,
    { immediate: false },
  );

  const nextStep = () => {
    currentDepositStep.value += 1;
  };

  const prevStep = () => {
    currentDepositStep.value = Math.max(1, currentDepositStep.value - 1);
  };

  const setDataToCookie = (durationInSeconds: number) => {
    const expireTime = dayjs().add(durationInSeconds, "second").toDate();
    const cookie = useCookie<typeof detailDeposit>(keySaveCookie.value, { expires: expireTime });
    cookie.value = detailDeposit;
  };

  const setDataCodepay = (data: typeof detailDeposit) => {
    Object.keys(data).forEach((_key) => {
      const keyType = _key as keyof typeof data;
      if (Object.keys(data || {}).some((item) => item === keyType) && data?.[keyType]) {
        detailDeposit[keyType] = data[keyType] as never;
      }
    });
  };

  onMounted(() => {
    const dataInCookie = useCookie<typeof detailDeposit>(keySaveCookie.value);
    if (dataInCookie.value) {
      setDataCodepay(dataInCookie.value);
      formDepositValues.amount = Number(dataInCookie.value.amount) / RATE_K_VND;
      nextStep();
      resumeIntervalTransaction();
    }
  });

  const submitFormDeposit = async () => {
    try {
      nextStep();
      const data = await $depositService.depositNicePay({
        amount: formDepositValues.amount * RATE_K_VND,
        package_id: formDepositValues.package_id,
      });

      setDataCodepay(data);
      const now = dayjs();
      const durationInSeconds = dayjs(detailDeposit.expired_at).diff(now, "second");
      const timeLeft = dayjs().add(durationInSeconds, "second");
      detailDeposit.timeLeft = timeLeft.toDate();
      detailDeposit.timeLeftCreateNewInvoice = dayjs().add(COUNTDOWN_CREATE_TRANSACTION, "second").toDate();

      setDataToCookie(durationInSeconds);
      if (!isActiveIntervalTransaction.value) {
        resumeIntervalTransaction();
      }
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }
  };

  const navigateToDetailTransaction = () => {
    navigateTo(`${APP_PATH.TRANSACTION_HISTORY}?id=${detailDeposit.invoice_id}`);
  };

  return {
    depositCodepayValidationSchema,
    formDepositValues,
    isUserBankAvailable,
    currentDepositStep,
    promotionPackages,
    isCommissionPackage,
    nextStep,
    prevStep,
    convertUnitToVND,
    submitFormDeposit,
    viewDetailDeposit,
    detailDeposit,
    AMOUNT_FIELD_RULE,
    createNewDepositInvoice,
    navigateToDetailTransaction,
  };
}
