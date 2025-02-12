export type ITransactionHistoryData = {
  package_id: PackageEnum;
  type: TransactionHistoryTypeEnum;
  to_bank_code: string;
  action: TransactionHistoryActionEnum;
  id: number;
  bank_trancode: string;
  created_time: Date;
  amount: number;
  method: TransactionHistoryMethodEnum;
  last_updated_time: Date;
  status: TransactionHistoryStatusEnum;
  title: string;
  commission_type: string;
  promotion_type: string;
};

export type IBaseInvoice = {
  username: string;
  amount: number;
  method: TransactionHistoryMethodEnum;
  uniq_id: string;
  br_code: string;
  en_n: string;
  note: string;
  type: TransactionHistoryTypeEnum;
  content: string;
  action: TransactionHistoryActionEnum;
  status: TransactionHistoryStatusEnum;
  processed: boolean;
  user_type: number;
  created_time: string;
  last_updated_time: string;
  id: string;
  balance_after: number;
  balance_before: number;
  retry_sync_accounting: number;
  user_created_time: string;
  aff_id: string;
  is_match_user_created_time: boolean;
  statement_img: string;
  to_bank_name_mask: string;
  to_bank_no_mask: string;
  from_bank_name: string;
  to_bank_code: string;
  to_bank_name: string;
  to_bank_no: string;
  card_provider?: string;
  to_bank_owner_mask: string;
  bank_trancode?: string;
};

export type IDetailTransactionResponse = {
  data: IUploadTransactionResponse;
  status: ResponseStatusEnum;
};

export type IUploadTransactionResponse = {
  path: string;
  img_url: string;
};

export type ITransactionItem = {
  id: number;
  icon: string;
  title: string;
  status: string;
  type: string;
  amount: string;
  time: string;
  status_class: string;
  action: string;
  method: string;
  created_time: Date;
};

export type IMomoInvoice = IBaseInvoice & {
  method: TransactionHistoryMethodEnum.MOMO;
  bank_trancode: string;
  from_bank_no: string;
};

export type ICryptoInvoice = IBaseInvoice & {
  method: TransactionHistoryMethodEnum.CRYPTOPAY;
  currency: string;
  crypto_amount: number;
  wallet_address: string;
  live_check: string;
  ex_rate?: number;
  crypto_id: number;
  network: string;
};

export type IEWalletBankingInvoice = IBaseInvoice & {
  method: TransactionHistoryMethodEnum.EWALLET_BANKING;
  fee: number;
  provider_name: string;
  bank_trancode: string;
  ewallet_type: string;
  ewallet_note: string;
};

export type IPhoneCardInvoice = IBaseInvoice & {
  method: TransactionHistoryMethodEnum.PHONE_CARD;
  card_provider: IProviderType;
  card_code?: string;
  card_serial: string;
  card_amount: number;
  card_gateway_code?: string;
  card_number: number;
  cashier_status?: string;
  first_process_by?: string;
  owner_push_invoice?: string;
};

export enum IProviderType {
  VIETTEL = "VIETTEL",
  VINAPHONE = "VINAPHONE",
  MOBIFONE = "MOBIFONE",
  ZING = "ZING",
}

export enum TransactionHistoryMethodEnum {
  PHONE_CARD = "PHONE_CARD",
  IBANKING = "IBANKING",
  MOMO = "MOMO",
  SMARTPAY = "SMARTPAY",
  SENPAY = "SENPAY",
  CODEPAY = "CODEPAY",
  BANK_ACCOUNT = "BANK_ACCOUNT",
  CRYPTOPAY = "CRYPTOPAY",
  NICEPAY = "NICEPAY",
  EWALLET_BANKING = "EWALLET_BANKING",
  P2P = "P2P",
  SYSTEM = "SYSTEM",
}

export enum TransactionHistoryTypeEnum {
  PAYMENT = "PAYMENT",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  PROMOTION = "PROMOTION",
  PROMOTION_CANCEL = "PROMOTION_CANCEL",
  COMMISSION = "COMMISSION",
}

export enum TransactionHistoryActionEnum {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  PROMOTION = "PROMOTION",
  COMMISSION = "COMMISSION",
}

export enum TransactionHistoryStatusEnum {
  FINISHED = "FINISHED",
  CANCEL = "CANCEL",
  PROCESSING = "PROCESSING",
}

export type ITransactionHistoryService = {
  getListTransactionHistory: (params?: Record<string, string | number>) => Promise<ITransactionHistoryData[]>;
  lastSuccessTransactionHistory: (params: Record<string, string | number>) => Promise<ITransactionHistoryData>;
  uploadImageTransaction: (
    formData: FormData,
    header: { "Content-Type": string },
  ) => Promise<IDetailTransactionResponse>;
  getTransactionHistoryDetail: (id: string) => Promise<IBaseInvoice>;
  updateImageTransaction: (id: string, params: { statement_img: string }) => Promise<string>;
};

export enum PaymentMethodStatusEnum {
  DEFAULT = "default",
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
}
