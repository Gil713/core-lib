export type IMenuAccountDesktop = {
  name: string;
  shortName?: string;
  icon: string;
  activeUrl: string;
  activeUrlRelative: string;
  isHiddenInTab: boolean;
  isHiddenInDropdown?: boolean;
};

export const accountMenuList: IMenuAccountDesktop[] = [
  {
    name: "Thông tin cá nhân",
    shortName: "Tài khoản",
    icon: "SvgoAccountUserInfo",
    activeUrl: APP_PATH.PROFILE,
    activeUrlRelative: APP_PATH.PROFILE,
    isHiddenInTab: false,
  },
  {
    name: "Nạp tiền",
    icon: "SvgoAccountDeposit",
    activeUrl: APP_PATH.DEPOSIT_CODEPAY,
    activeUrlRelative: APP_PATH.DEPOSIT,
    isHiddenInTab: false,
  },
  {
    name: "Rút tiền",
    icon: "SvgoAccountWithdraw",
    activeUrl: APP_PATH.WITHDRAW_BANK,
    activeUrlRelative: APP_PATH.WITHDRAW,
    isHiddenInTab: false,
  },
  {
    name: "Giao dịch P2P",
    icon: "SvgoAccountP2p",
    activeUrl: APP_PATH.TRADING_P2P,
    activeUrlRelative: APP_PATH.TRADING_P2P,
    isHiddenInTab: false,
  },
  {
    name: "Lịch sử",
    icon: "SvgoAccountHistory",
    activeUrl: APP_PATH.TRANSACTION_HISTORY,
    activeUrlRelative: APP_PATH.BET_HISTORY,
    isHiddenInTab: false,
  },
  {
    name: "Tiền thưởng",
    icon: "SvgoAccountBonus",
    activeUrl: APP_PATH.BONUS,
    activeUrlRelative: APP_PATH.BONUS,
    isHiddenInTab: false,
  },
  {
    name: "Ngân hàng",
    icon: "SvgoAccountBank",
    activeUrl: APP_PATH.BANK,
    activeUrlRelative: APP_PATH.BANK,
    isHiddenInTab: false,
    isHiddenInDropdown: true,
  },
];

export const NUMBER_OF_BANK_LIMIT = 5;

export const CARD_WITHDRAWAL_RANGE = {
  MIN: 1,
  MAX: 5,
};

export const BANK_WITHDRAWAL_RANGE = {
  MAX: 8,
};

export const CARD_SERIAL_LENGTH = {
  ZING_MIN: 9,
  MIN: 10,
  MAX: 15,
};

export const CARD_CODE_LENGTH = {
  ZING_MIN: 9,
  MIN: 10,
  MAX: 15,
};
