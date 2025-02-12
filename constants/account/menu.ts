import { SvgoBank, SvgoBitcoin, SvgoCodepay, SvgoCodepay2, SvgoP2p, SvgoTheCao, SvgoWallet } from "#components";

type IAccountDepositMenu = {
  name: string;
  path: string;
};

export type IAccountMenuDesktop = {
  name: string;
  path: string;
};

export type IAccountMenuMobile = {
  icon: string;
  title: string;
  path: string;
  description?: string;
  isUnderMaintenance?: boolean;
};

export enum AccountDepositBankMethodEnum {
  CODE_PAY = "CodePay",
  CODE_PAY2 = "CodePay2",
}

export enum AccountDepositMethodEnum {
  BANK = "Ngân Hàng",
  CRYPTO = "Tiền Ảo",
  E_WALLET = "Ví Điện Tử",
  CARD = "Thẻ Cào",
}

export const accountWithdrawMethodMenus: IAccountMenuDesktop[] = [
  {
    name: AccountDepositMethodEnum.BANK,
    path: APP_PATH.WITHDRAW_BANK,
  },
  {
    name: AccountDepositMethodEnum.CRYPTO,
    path: APP_PATH.WITHDRAW_CRYPTO,
  },
  {
    name: AccountDepositMethodEnum.CARD,
    path: APP_PATH.WITHDRAW_CARD,
  },
];

export const accountDepositMethodMenus: IAccountDepositMenu[] = [
  {
    name: AccountDepositMethodEnum.BANK,
    path: APP_PATH.DEPOSIT_CODEPAY,
  },
  {
    name: AccountDepositMethodEnum.CRYPTO,
    path: APP_PATH.DEPOSIT_CRYPTO,
  },
  {
    name: AccountDepositMethodEnum.E_WALLET,
    path: APP_PATH.DEPOSIT_MOMO,
  },
  {
    name: AccountDepositMethodEnum.CARD,
    path: APP_PATH.DEPOSIT_CARD,
  },
];

export const accountHistoryMenus: IAccountMenuDesktop[] = [
  {
    name: "Lịch Sử Giao Dịch",
    path: APP_PATH.TRANSACTION_HISTORY,
  },
  {
    name: "Lịch Sử Cá Cược",
    path: APP_PATH.BET_HISTORY,
  },
];

type IAccountDepositBankMenu = IAccountDepositMenu & {
  icon: string;
  isUnderMaintenance: boolean;
};

export const accountDepositBankMenus: IAccountDepositBankMenu[] = [
  {
    name: AccountDepositBankMethodEnum.CODE_PAY,
    path: APP_PATH.DEPOSIT_CODEPAY,
    icon: "SvgoAccountCodepay",
    isUnderMaintenance: false,
  },
  {
    name: AccountDepositBankMethodEnum.CODE_PAY2,
    path: APP_PATH.DEPOSIT_CODEPAY2,
    icon: "SvgoAccountCodepay2",
    isUnderMaintenance: false,
  },
];

export const eWalletPaymentMethods: IPaymentMethod[] = [
  {
    name: "Momo",
    img: "account/momo.webp",
    type: EWalletPaymentMethodTypeEnum.MOMO,
    isUnderMaintenance: false,
    url: APP_PATH.DEPOSIT_MOMO,
  },
  {
    name: "Viettel Money",
    img: "account/viettelpay.webp",
    type: EWalletPaymentMethodTypeEnum.VIETTEL_PAY,
    isUnderMaintenance: false,
    url: APP_PATH.DEPOSIT_VIETTEL,
  },
];

export const accountWithdrawMethodMenusMobile: IAccountMenuMobile[] = [
  {
    icon: SvgoBank,
    title: "Ngân hàng",
    description: "Duyệt rút nhanh chóng",
    isUnderMaintenance: false,
    path: APP_PATH.WITHDRAW_BANK,
  },
  {
    icon: SvgoBitcoin,
    title: "Tiền ảo",
    description: "Duyệt tự động",
    isUnderMaintenance: false,
    path: APP_PATH.WITHDRAW_CRYPTO,
  },
  {
    icon: SvgoP2p,
    title: "Giao dịch P2P",
    description: "Nhanh chóng, tiện lợi",
    isUnderMaintenance: false,
    path: APP_PATH.TRADING_P2P,
  },
  {
    icon: SvgoTheCao,
    title: "Thẻ cào",
    description: "Hô trợ 5 thẻ / lần",
    isUnderMaintenance: false,
    path: APP_PATH.WITHDRAW_CARD,
  },
];

export const accountDepositMethodMenusMobile: IAccountMenuMobile[] = [
  {
    icon: SvgoCodepay,
    title: "CodePay",
    description: "Khuyến mãi hấp dẫn",
    isUnderMaintenance: false,
    path: APP_PATH.DEPOSIT_CODEPAY,
  },
  {
    icon: SvgoCodepay2,
    title: "CodePay2",
    description: "Quét mã thanh toán tự động",
    isUnderMaintenance: false,
    path: APP_PATH.DEPOSIT_CODEPAY2,
  },
  {
    icon: SvgoP2p,
    title: "Giao dịch P2P",
    description: "Nhanh chóng, tiện lợi",
    isUnderMaintenance: false,
    path: APP_PATH.TRADING_P2P,
  },
  {
    icon: SvgoBitcoin,
    title: "Tiền ảo",
    description: "Tặng 0.8%",
    isUnderMaintenance: false,
    path: APP_PATH.DEPOSIT_CRYPTO,
  },
  {
    icon: SvgoWallet,
    title: "Ví điện tử",
    description: "Momo, Viettel Money",
    isUnderMaintenance: true,
    path: APP_PATH.DEPOSIT_MOMO,
  },
  {
    icon: SvgoTheCao,
    title: "Thẻ cào",
    description: "Hỗ trợ nhiều nhà mạng",
    isUnderMaintenance: false,
    path: APP_PATH.DEPOSIT_CARD,
  },
];
