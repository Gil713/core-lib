export type IEWalletTransferCodeResponse = {
  code: string;
};

export type IDepositCardResponse = {
  id: number;
  code: string;
  type: string;
  action: string;
  card_code: string;
  card_provider: string;
  card_serial: string;
  created_time: string;
  amount: number;
  card_amount: number;
  method: string;
  status: string;
};

export type IDepositPhoneCardBody = {
  card_amount: number;
  card_code: string;
  card_serial: string;
  to_telcom_code: SystemPhoneCardPaymentNameEnum;
};

export type IDepositService = {
  depositNicePay: (params: Record<string, string | number>) => Promise<IDepositCodePay>;
  depositGoPay: (body: Record<string, string | number>) => Promise<IDepositCodePay>;
  getEWalletTransferCode: () => Promise<IEWalletTransferCodeResponse["code"]>;
  sendDepositCardRequest: (params: IDepositPhoneCardBody) => Promise<IDepositCardResponse>;
};
