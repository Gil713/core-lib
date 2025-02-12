import dayjs from "dayjs";

const getTypeTitle = (type: TransactionHistoryTypeEnum, action: TransactionHistoryActionEnum) => {
  if (type === TransactionHistoryTypeEnum.PAYMENT) {
    return action === TransactionHistoryActionEnum.DEPOSIT
      ? MappedTransactionHistoryTitleEnum.DEPOSIT
      : MappedTransactionHistoryTitleEnum.WITHDRAW;
  }

  const typeTitleMapping: Record<TransactionHistoryTypeEnum, MappedTransactionHistoryTitleEnum | ""> = {
    [TransactionHistoryTypeEnum.WITHDRAW]: MappedTransactionHistoryTitleEnum.WITHDRAW,
    [TransactionHistoryTypeEnum.PROMOTION]: MappedTransactionHistoryTitleEnum.PROMOTION,
    [TransactionHistoryTypeEnum.COMMISSION]: MappedTransactionHistoryTitleEnum.COMMISSION,
    [TransactionHistoryTypeEnum.PROMOTION_CANCEL]: MappedTransactionHistoryTitleEnum.PROMOTION_CANCEL,
    [TransactionHistoryTypeEnum.PAYMENT]: "",
    [TransactionHistoryTypeEnum.DEPOSIT]: "",
  };

  return typeTitleMapping[type] || "";
};

export const getMethodImage = ({
  type,
  action = TransactionHistoryActionEnum.DEPOSIT,
}: {
  method: string;
  type: TransactionHistoryTypeEnum;
  action?: TransactionHistoryActionEnum;
}) => {
  return [TransactionHistoryTypeEnum.COMMISSION, TransactionHistoryTypeEnum.PROMOTION].includes(type)
    ? `SvgoAccountHistoryDetailBonus`
    : `SvgoAccount${action.charAt(0)?.toUpperCase() + action.slice(1).toLowerCase()}`;
};

export const useHistoryTransactions = () => {
  const nuxt = useNuxtApp();

  const $device = useDevice();

  const payload: Record<string, string | number> = {
    limit: 10,
  };

  const {
    data: dataTransactionHistory,
    error,
    status,
  } = useAsyncData(
    `getListTransactionHistory`,
    async () => {
      return await nuxt.$transactionHistoryService.getListTransactionHistory(payload);
    },
    {
      transform(res) {
        return res.map((item: ITransactionHistoryData) => {
          const amountStatus = item.action === TransactionHistoryActionEnum.DEPOSIT ? "+" : "-";
          let method = "";
          if (item.method) {
            method =
              MappedTransactionHistoryMethodEnum[
                item.method?.toUpperCase() as keyof typeof MappedTransactionHistoryMethodEnum
              ];
          }

          return {
            id: item.id,
            icon: getMethodImage({ method: item.method, type: item.type, action: item.action }),
            title: getActionTitle({ action: item.action, type: item.type, method }),
            status: getTransitionStatus(item.status),
            type: getTypeTitle(item.type, item.action),
            amount: `${amountStatus + (formatVNDCurrency(item.amount) || 0)}`,
            time:
              dayjs(item.created_time).format($device.isDesktop ? SHORT_DATE_FORMAT : DATE_TIME_HISTORY_SHORT_FORMAT) ||
              "",
            status_class: getStatusClass(item.status),
            action: item.action,
            method,
            created_time: item.created_time,
          };
        });
      },
      server: false,
    },
  );

  return {
    dataTransactionHistory,
    error,
    status,
  };
};
