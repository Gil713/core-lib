import dayjs from "dayjs";

const emptyValue = "---";

const formatAmount = (amount: number | undefined, unit: string = "VND") =>
  `${formatNumberWithCommas(amount || 0)} ${unit}`;

const buildDetail = (label: string, value: string | number | undefined, field?: string): IDetailType => ({
  label,
  value: value || emptyValue,
  ...(field ? { field } : {}),
});

const calculateCardFee = (
  card_provider: IProviderType | undefined,
  card_amount: number | undefined,
  listCard: ComputedRef<IMappedSystemPhoneCardPaymentWImg[] | null>,
) => {
  if (!card_provider || !card_amount || !listCard.value) return 0;

  const matchedProvider = (
    listCard.value as unknown as Array<{
      systemPhoneCardProviderName: IProviderType;
      systemPhoneCardPaymentInfo: ISystemPhoneCardPaymentInfo;
    }>
  ).find((item) => item.systemPhoneCardProviderName === card_provider);

  const rate = matchedProvider?.systemPhoneCardPaymentInfo?.rate || 0;
  return formatNumberToPrecision((1 - rate) * card_amount, 100);
};

const getPhoneCardDepositDetails = (
  invoice: IPhoneCardInvoice,
  listCard: ComputedRef<IMappedSystemPhoneCardPaymentWImg[] | null>,
): IDetailType[] => {
  const { card_provider, card_amount, card_code, card_serial } = invoice;

  const cardFee = calculateCardFee(card_provider, card_amount, listCard);
  const actuallyReceived = card_amount ? card_amount - cardFee : 0;

  return [
    buildDetail(MappedTransactionHistoryLabelEnum.HOME_NETWORK, card_provider),
    buildDetail(MappedTransactionHistoryLabelEnum.ID_CARD, card_code),
    buildDetail(MappedTransactionHistoryLabelEnum.SERI_NUMBER, card_serial),
    buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT_BANK, formatAmount(card_amount)),
    buildDetail(MappedTransactionHistoryLabelEnum.CARD_FEE, formatAmount(cardFee)),
    buildDetail(MappedTransactionHistoryLabelEnum.ACTUALLY_RECEIVED, formatAmount(actuallyReceived)),
  ];
};

const getPhoneCardWithdrawDetails = (invoice: IPhoneCardInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.HOME_NETWORK, invoice.card_provider),
  buildDetail(MappedTransactionHistoryLabelEnum.TYPE_CARD, formatAmount(invoice.card_amount / invoice.card_number)),
  buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT, "0" + invoice.card_number, TransactionFieldDetailEnum.AMOUNT),
  buildDetail(MappedTransactionHistoryLabelEnum.NOTES, invoice.note),
];

const getCryptoWithdrawDetails = (invoice: ICryptoInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT_RECEIVE_WITHDRAW_CRYPTO, formatAmount(invoice.amount)),
  buildDetail(MappedTransactionHistoryLabelEnum.RATE, formatAmount(invoice.ex_rate)),
  buildDetail(
    MappedTransactionHistoryLabelEnum.AMOUNT_CRYPTO,
    invoice.crypto_amount && invoice.currency ? `${invoice.crypto_amount} ${invoice.currency}` : emptyValue,
  ),
  buildDetail(MappedTransactionHistoryLabelEnum.RECEIVING_WALLET, invoice.wallet_address, "wallet"),
  buildDetail(MappedTransactionHistoryLabelEnum.CHECKED, invoice.live_check, "link-crypto"),
  buildDetail(MappedTransactionHistoryLabelEnum.NOTES, invoice.note),
];

const getDefaultWithdrawDetails = (invoice: IBaseInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.BANK, invoice.to_bank_code),
  buildDetail(MappedTransactionHistoryLabelEnum.BANK_NUMBER, invoice.to_bank_no_mask),
  buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT_MONEY, formatAmount(invoice.amount)),
  buildDetail(MappedTransactionHistoryLabelEnum.NOTES, invoice.note),
];

const getP2PWithdrawDetails = (invoice: IBaseInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT_MONEY, formatAmount(invoice.amount)),
  buildDetail(MappedTransactionHistoryLabelEnum.NOTES, invoice.note),
];

const getMomoDepositDetails = (invoice: IMomoInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.ACCOUNT_HOLDER, invoice.from_bank_name),
  buildDetail(MappedTransactionHistoryLabelEnum.PHONE, formatPhoneNumber(invoice.from_bank_no)),
  buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT_BANK, formatAmount(invoice.amount)),
  buildDetail(MappedTransactionHistoryLabelEnum.REMITTANCE_CONTENT, invoice.bank_trancode?.toUpperCase()),
  buildDetail(MappedTransactionHistoryLabelEnum.NOTES, invoice.note),
];

const getDepositRefundPromotion = (invoice: IBaseInvoice): IDetailType[] => [
  buildDetail(
    MappedTransactionHistoryLabelEnum.AMOUNT_MONEY + " " + MappedTransactionHistoryLabelEnum.DEPOSIT.toLowerCase(),
    formatAmount(invoice.amount),
  ),
];

const getCryptoDepositDetails = (invoice: ICryptoInvoice): IDetailType[] => [
  buildDetail(
    MappedTransactionHistoryLabelEnum.AMOUNT_CRYPTO,
    invoice.crypto_amount && invoice.currency ? `${invoice.crypto_amount} ${invoice.currency}` : undefined,
  ),
  buildDetail(MappedTransactionHistoryLabelEnum.RATE, formatAmount(invoice.ex_rate)),
  buildDetail(MappedTransactionHistoryLabelEnum.AMOUNT_RECEIVE, formatAmount(invoice.amount)),
  buildDetail(MappedTransactionHistoryLabelEnum.RECEIVING_WALLET, invoice.wallet_address, "wallet"),
  buildDetail(MappedTransactionHistoryLabelEnum.CHECKED, invoice.live_check, "link-crypto"),
  buildDetail(MappedTransactionHistoryLabelEnum.NOTES, invoice.note),
];

const getEWalletBankingDepositDetails = (invoice: IEWalletBankingInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.SENDER, invoice.from_bank_name),
  buildDetail(
    MappedTransactionHistoryLabelEnum.AMOUNT_MONEY + " " + MappedTransactionHistoryLabelEnum.DEPOSIT.toLowerCase(),
    formatAmount(invoice.amount),
  ),
  buildDetail(MappedTransactionHistoryLabelEnum.REMITTANCE_CONTENT, invoice.bank_trancode?.toUpperCase()),
];

const getDefaultDepositDetails = (invoice: IBaseInvoice): IDetailType[] => [
  buildDetail(MappedTransactionHistoryLabelEnum.BANK, invoice.to_bank_code),
  buildDetail(MappedTransactionHistoryLabelEnum.SENDER, invoice.from_bank_name),
  buildDetail(
    MappedTransactionHistoryLabelEnum.AMOUNT_MONEY + " " + MappedTransactionHistoryLabelEnum.DEPOSIT.toLowerCase(),
    formatAmount(invoice.amount),
  ),
  buildDetail(MappedTransactionHistoryLabelEnum.REMITTANCE_CONTENT, invoice.bank_trancode?.toUpperCase()),
];

const getDepositDetails = (
  invoice: IBaseInvoice,
  listCard: ComputedRef<IMappedSystemPhoneCardPaymentWImg[] | null>,
): IDetailType[] => {
  switch (invoice.method?.toUpperCase()) {
    case TransactionHistoryMethodEnum.PHONE_CARD:
      return getPhoneCardDepositDetails(invoice as unknown as IPhoneCardInvoice, listCard);
    case TransactionHistoryMethodEnum.MOMO:
      return getMomoDepositDetails(invoice as unknown as IMomoInvoice);
    case TransactionHistoryMethodEnum.CRYPTOPAY:
      return getCryptoDepositDetails(invoice as unknown as ICryptoInvoice);
    case TransactionHistoryMethodEnum.EWALLET_BANKING:
      return [
        ...getEWalletBankingDepositDetails(invoice as IEWalletBankingInvoice),
        ...(invoice.status === TransactionHistoryStatusEnum.FINISHED
          ? [
              {
                label: MappedTransactionHistoryLabelEnum.NOTES,
                value: "Hoàn trả vô tận 1.25%",
              },
            ]
          : []),
      ];
    case TransactionHistoryMethodEnum.SYSTEM:
      return [
        ...getDepositRefundPromotion(invoice),
        {
          label: MappedTransactionHistoryLabelEnum.NOTES,
          value: invoice.note || emptyValue,
        },
      ];
    default:
      return [
        ...getDefaultDepositDetails(invoice),
        ...(invoice.status === TransactionHistoryStatusEnum.FINISHED
          ? [
              {
                label: MappedTransactionHistoryLabelEnum.NOTES,
                value: invoice.note || emptyValue,
              },
            ]
          : []),
      ];
  }
};

const getWithdrawDetails = (invoice: IBaseInvoice): IDetailType[] => {
  const withdrawDetailsMap: { [key: string]: (invoice: IBaseInvoice) => IDetailType[] } = {
    [TransactionHistoryMethodEnum.P2P]: getP2PWithdrawDetails,
    [TransactionHistoryMethodEnum.PHONE_CARD]: (invoice) =>
      getPhoneCardWithdrawDetails(invoice as unknown as IPhoneCardInvoice),
    [TransactionHistoryMethodEnum.CRYPTOPAY]: (invoice) =>
      getCryptoWithdrawDetails(invoice as unknown as ICryptoInvoice),
  };

  const method = invoice.method.toUpperCase();
  const getDetails = withdrawDetailsMap[method] || getDefaultWithdrawDetails;

  return getDetails(invoice);
};

export const dataDetailFormat = (
  transactionDetail: IBaseInvoice,
  method: string,
  listCard: ComputedRef<IMappedSystemPhoneCardPaymentWImg[] | null>,
): IDetailType[] => {
  let detailType: IDetailType[] = [];
  const actionText =
    transactionDetail.action === TransactionHistoryActionEnum.DEPOSIT
      ? MappedTransactionHistoryTitleEnum.DEPOSIT
      : MappedTransactionHistoryTitleEnum.WITHDRAW;

  switch (transactionDetail.action) {
    case TransactionHistoryActionEnum.DEPOSIT:
      if (transactionDetail.type === TransactionHistoryTypeEnum.PROMOTION) {
        detailType = [
          {
            label: MappedTransactionHistoryLabelEnum.AMOUNT_REWARD,
            value: formatNumberWithCommas(transactionDetail.amount || 0) + " VND",
          },
          {
            label: MappedTransactionHistoryLabelEnum.NOTES,
            value: transactionDetail.note || emptyValue,
          },
        ];
      } else {
        detailType = getDepositDetails(transactionDetail, listCard);
      }
      break;
    case TransactionHistoryActionEnum.WITHDRAW:
      if (transactionDetail.type === TransactionHistoryTypeEnum.PROMOTION_CANCEL) {
        detailType = [
          {
            label: MappedTransactionHistoryLabelEnum.AMOUNT_MONEY,
            value: "-" + formatNumberWithCommas(transactionDetail.amount || 0) + " VND",
          },
        ];
      } else {
        detailType = getWithdrawDetails(transactionDetail);
      }
      break;
  }

  const commonData = [
    {
      label: MappedTransactionHistoryLabelEnum.STATUS,
      value: getTransitionStatus(transactionDetail.status) || emptyValue,
      classStatus: getStatusClass(transactionDetail.status) || emptyValue,
      field: TransactionFieldDetailEnum.STATUS,
    },
    {
      label: MappedTransactionHistoryLabelEnum.TRANSACTIONS_CODE,
      value: transactionDetail.id || emptyValue,
      field: TransactionFieldDetailEnum.CODE,
    },
    {
      label: MappedTransactionHistoryLabelEnum.TIME,
      value: dayjs(transactionDetail.created_time).format(DATE_TIME_HISTORY_FORMAT) || emptyValue,
    },
    {
      label: MappedTransactionHistoryLabelEnum.METHOD + " " + actionText?.toLowerCase(),
      value:
        getActionTitle({ action: transactionDetail.action, type: transactionDetail.type, method, isText: true }) ||
        emptyValue,
    },
  ];
  return [...commonData, ...detailType];
};
