export type IDepositCodePay = {
  invoice_id: number;
  amount: number;
  code: string;
  bank_code: string;
  bank_name: string;
  account_no: string;
  account_name: string;
  expired_at: Date;
  created_at: Date;
  failed: number;
  package_id: number;
  qrcode_url: string;
};
