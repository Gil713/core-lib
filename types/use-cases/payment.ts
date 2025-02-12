export type IPaymentMethod = {
  name: string;
  img: string;
  type: EWalletPaymentMethodTypeEnum;
  url: string;
  isUnderMaintenance: boolean;
};

export type IGuide = {
  icon: string;
  text: string;
};

export type IInvoiceField = {
  label: string;
  value: string | number;
  isCopy?: boolean;
};

export enum CryptoNetwork {
  TRC20 = "TRC20",
  ERC20 = "ERC20",
  BEP20 = "BEP20",
}

export enum ISystemIframeThemes {
  LIGHT_STYLE = 0,
  DARK_STYLE = 1,
}
