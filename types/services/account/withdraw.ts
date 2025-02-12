export type IWithdrawCardResponse = {
  partner_code: string;
  code: string;
  user_id: number;
  username: string;
  amount: number;
  method: string;
  card_provider: string;
  card_amount: number;
  card_number: number;
  note: string;
  type: string;
  wallet_type: number;
  action: string;
  status: string;
  sync_accounting_status: string;
  created_by: string;
  branch: string;
  processed: boolean;
  device: string;
  device_name: string;
  os_name: string;
  browser_name: string;
  sale_advised: string;
  ip: string;
  aff_id: string;
  os: string;
  browser: string;
  source: string;
  user_type: number;
  encode_status: number;
  _id: string;
  id: number;
  created_time: string;
  last_updated_time: string;
};

export type IWithdrawBankData = {
  partner_code: string;
  code: string;
  user_id: number;
  username: string;
  amount: number;
  method: string;
  to_bank_code: string;
  to_bank_name: string;
  to_bank_no: string;
  type: string;
  wallet_type: number;
  action: string;
  status: string;
  sync_accounting_status: string;
  created_by: string;
  branch: string;
  processed: false;
  device: string;
  device_name: string;
  os_name: string;
  browser_name: string;
  sale_advised: string;
  ip: string;
  aff_id: string;
  os: string;
  browser: string;
  source: string;
  is_first_time_withdraw: true;
  user_type: number;
  encode_status: number;
  _id: string;
  id: number;
  created_time: string;
  last_updated_time: string;
  to_bank_name_mask: string;
  to_bank_no_mask: string;
};

export type IWithdrawBankBody = {
  amount_withdraw: number;
  to_bank_code: string;
  to_bank_name: string;
  to_bank_no: string;
};

export type IWithdrawCardBody = {
  card_amount_unit: number;
  card_number: number;
  to_telcom_code: SystemPhoneCardPaymentNameEnum;
};

export type IWithdrawService = {
  getWithdrawCard: (payload: IWithdrawCardBody) => Promise<IWithdrawCardResponse>;
  getWithdrawBank: (payload: IWithdrawBankBody) => Promise<IWithdrawBankData>;
};
