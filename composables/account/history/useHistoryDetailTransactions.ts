import isEmpty from "lodash/isEmpty";

export type IDetailType = {
  label: string;
  value: string | number;
  field?: string;
  classStatus?: string;
};

export const useHistoryDetailTransactions = () => {
  const nuxt = useNuxtApp();
  const { createToast } = useToast();
  const dataHistory = ref<IDetailType[] | undefined>(undefined);
  const dataAmount = ref<string>("");
  const titleDetail = ref<string>("");
  const statusTransaction = ref<string>("");
  const actionHistory = ref<string>("");
  const transactionType = ref<string>("");
  const dataCardSerial = ref<Array<{ pincode: string; serial: string }> | undefined>(undefined);
  const cardProvider = ref<IProviderType | undefined>(undefined);
  const statementImgUrl = ref<string>("");
  const methodDeposit = ref<string>("");
  const dataTransaction = ref<IBaseInvoice | undefined>(undefined);
  const { mappedSystemPhoneCardPaymentWImg } = useSystemPhoneCardPayment();

  const listCard = computed<IMappedSystemPhoneCardPaymentWImg[] | null>(() => mappedSystemPhoneCardPaymentWImg.value);

  const getTransactionsDetail = async (id: string) => {
    try {
      const data = await nuxt.$transactionHistoryService.getTransactionHistoryDetail(id);
      if (!isEmpty(data)) {
        const amountStatus = data?.action === TransactionHistoryActionEnum.DEPOSIT ? "+" : "-";
        const method =
          MappedTransactionHistoryMethodEnum[
            data.method?.toUpperCase() as keyof typeof MappedTransactionHistoryMethodEnum
          ];
        dataHistory.value = dataDetailFormat(data, method, listCard);
        titleDetail.value = getActionTitle({
          action: data?.action,
          type: data?.type,
          method: data?.method,
          isText: true,
        });
        dataAmount.value = `${amountStatus + (formatAmountUnitEvent(data?.amount.toString()) + " VND")}`;
        statusTransaction.value = getStatusClass(data?.status);
        dataCardSerial.value = (data as unknown as IPhoneCardInvoice)?.card_serial
          ? JSON.parse((data as unknown as IPhoneCardInvoice)?.card_serial.toString())
          : "";
        cardProvider.value = data?.card_provider as IProviderType;
        actionHistory.value = data?.action;
        transactionType.value = data?.type;
        statementImgUrl.value = data?.statement_img ?? "";
        methodDeposit.value = data?.method;
      } else {
        dataHistory.value = undefined;
        createToast({
          variant: "destructive",
          description: "Tải lịch sử giao dịch thất bại",
        });
      }
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message || "Tải lịch sử giao dịch thất bại",
      });
    }
  };

  return {
    getTransactionsDetail,
    dataTransaction,
    dataHistory,
    dataAmount,
    titleDetail,
    statusTransaction,
    actionHistory,
    transactionType,
    statementImgUrl,
    methodDeposit,
    dataCardSerial,
    cardProvider,
  };
};
