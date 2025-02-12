export const getStatusClass = (status: TransactionHistoryStatusEnum) => {
  const statusClassMapping: Record<TransactionHistoryStatusEnum, string> = {
    [TransactionHistoryStatusEnum.FINISHED]: "finished",
    [TransactionHistoryStatusEnum.CANCEL]: "cancel",
    [TransactionHistoryStatusEnum.PROCESSING]: "processing",
  };

  return statusClassMapping[status] || "processing";
};

export const getActionTitle = ({
  action = TransactionHistoryActionEnum.DEPOSIT,
  type,
  method,
  isText = false,
}: {
  action: TransactionHistoryActionEnum;
  type: TransactionHistoryTypeEnum;
  method: string;
  isText?: boolean;
}): string => {
  // Define title mappings for "P2P" method
  if (method === MappedTransactionHistoryMethodEnum.P2P) {
    const p2pTitleMap: Record<string, string> = {
      [TransactionHistoryTypeEnum.DEPOSIT]: `Nạp tiền từ ví ${method}`,
      [TransactionHistoryTypeEnum.WITHDRAW]: `Rút tiền về ví ${method}`,
    };
    return p2pTitleMap[action] || "";
  }

  // Define mappings for non-"P2P" types
  const typeTitleMap: Record<TransactionHistoryTypeEnum, string> = {
    [TransactionHistoryTypeEnum.PROMOTION]: MappedTransactionHistoryActionEnum.PROMOTION,
    [TransactionHistoryTypeEnum.PROMOTION_CANCEL]: isText
      ? MappedTransactionHistoryLabelEnum.CANCEL_PROMOTION
      : `${TransactionHistoryActionEnum.WITHDRAW} ${MappedTransactionHistoryTitleEnum.PROMOTION.toLowerCase()}`,
    [TransactionHistoryTypeEnum.COMMISSION]: MappedTransactionHistoryActionEnum.COMMISSION,
    [TransactionHistoryTypeEnum.PAYMENT]: "",
    [TransactionHistoryTypeEnum.DEPOSIT]: "",
    [TransactionHistoryTypeEnum.WITHDRAW]: "",
  };

  if (typeTitleMap[type]) {
    return typeTitleMap[type];
  }

  // Define default action mappings
  const actionTitleMap: Record<string, string> = {
    [TransactionHistoryTypeEnum.DEPOSIT]: isText
      ? `${MappedTransactionHistoryLabelEnum.DEPOSIT} ${MappedTransactionHistoryLabelEnum.MONEY} ${method}`
      : `${MappedTransactionHistoryActionEnum.DEPOSIT} ${method}`,
    [TransactionHistoryTypeEnum.WITHDRAW]: isText
      ? `${MappedTransactionHistoryLabelEnum.WITHDRAW} ${MappedTransactionHistoryLabelEnum.MONEY} ${method}`
      : `${MappedTransactionHistoryActionEnum.WITHDRAW} ${method}`,
  };

  return actionTitleMap[action] || "";
};

export const getTransitionStatus = (status: TransactionHistoryStatusEnum) => {
  const statusMap: Record<TransactionHistoryStatusEnum, string> = {
    [TransactionHistoryStatusEnum.FINISHED]: MappedTransactionHistoryStatusEnum.FINISHED,
    [TransactionHistoryStatusEnum.CANCEL]: MappedTransactionHistoryStatusEnum.CANCEL,
    [TransactionHistoryStatusEnum.PROCESSING]: MappedTransactionHistoryStatusEnum.PROCESSING,
  };

  return statusMap[status] || MappedTransactionHistoryStatusEnum.PROCESSING;
};
