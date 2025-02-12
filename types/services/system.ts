export type ISystemDepositPayment = {
  momos: IMomoSysDepositPaymentMethod[];
  viettelPays: IViettelPaySysDepositPaymentMethod[];
  packages: ISystemDepositPackage[];
  userBanks: ISystemUserBankPaymentMethod[];
  providerGoPay: IProviderGoPayBankSysDepositPaymentMethod;
  nicepayBanks: INicepayBankSysDepositPaymentMethod[];
  withdrawBanks: IWithdrawBankSysDepositPaymentMethod[];
  crypto_v2: ICryptoV2SysDepositPaymentMethod[];
};

export type IMomoSysDepositPaymentMethod = {
  account_name: string;
  account_no: string;
  link?: string;
  qr_code: string;
  recharge_limit_current?: number;
};

export type IViettelPaySysDepositPaymentMethod = {
  account_name: string;
  account_no: string;
  qr_code: string;
};

export type ISystemDepositPackage = {
  name: string;
  description: string;
  multiplier: number;
  promotion: number;
  max_amount: number;
  type: string;
  id: number;
};

export type ISystemUserBankPaymentMethod = {
  id: string;
  bank_code: string;
  bank_account_name: string;
  bank_account_name_mask: string;
  bank_account_no: string;
  bank_account_no_mask: string;
  bank_name: string;
  img: string;
};

export type IProviderGoPayBankSysDepositPaymentMethod = {
  GOPAY: IGopay | undefined;
};

export type IGopay = {
  ewallets: IEwallet[];
  bankings: IBanking[];
};

export type IEwallet = {
  code: string;
  provider: string;
  status: number;
  min: number;
  max: number;
};

export type IBanking = {
  code: string;
  old_code: string;
  name: string;
  provider: string;
  status: number;
  min: number;
  max: number;
};

export type INicepayBankSysDepositPaymentMethod = {
  bank_name: string;
  bank_code: string;
  old_code: string;
  kt_code: string;
  getNotification: string;
  status: BankStatusEnum;
  priority: number;
  statement_time: string;
};

export enum BankStatusEnum {
  Active = "ACTIVE",
}

export type IWithdrawBankSysDepositPaymentMethod = {
  bank_code: string;
  bank_name: string;
  order: number;
};

export type ICryptoV2SysDepositPaymentMethod = {
  network: string[];
  token: string;
  buy_price: number;
  sell_price: number;
  wallet_address?: string;
  address?: string;
  is_under_maintenance?: boolean;
  is_support_withdraw?: boolean;
};

export enum PackageEnum {
  HOAN_TRA = 1, // Thưởng mỗi ngày
  THUONG_300 = 2, // Nhận ngay 3,000,000
  THUONG_200_1 = 3, // Nhận ngay 2,000,000
  THUONG_200_2 = 4, // Lên đến 12,000,000
  THUONG_150_1 = 5, // Nhận ngay 9,000,000
  THUONG_150_2 = 6, // Lên đến 45,000,000
  THUONG_100_1 = 7, // Lên đến 20,000,000
  THUONG_100_2 = 8, // Lên đến 25,000,000
  THUONG_THU_7 = 9, // 5% tiền nạp
}

export enum EWalletPaymentMethodTypeEnum {
  MOMO = "momo",
  VIETTEL_PAY = "viettel",
}

export type ISystemPlan = {
  name: string;
  type: string;
  deposit_amount: number;
  multiplier: number;
  rolling: number;
  rolling_info: string;
  package_id: PackageEnum;
  turnover: number;
  created_time: string;
  description: string;
  promotion_amount: string;
};

export type ISystemRankConfig = {
  ranks: IRankElement[];
  refundRanges: IRefundRanges;
};

export type IRankElement = {
  level: number;
  label: string;
  deposit: number;
  up_rank_amount: number;
};

export type IRefundRanges = {
  sport: number[];
  e_sport: number[];
  virtual_sport: number[];
  casino: number[];
  no_hu: number[];
  keno: number[];
  lode: number[];
  fishing_no_hu: number[];
  da_ga: number[];
  game_bai: number[];
};

export type IGameKey = keyof IRefundRanges;

type ITagBank = {
  img?: string;
};

export type IBankPaymentInfo = {
  bank_code: string;
  bank_name: string;
  img: string;
  maintain: boolean;
  tags: ITagBank; // need to verify whether use or not
};

export type ISystemBankPayment = {
  banks_master?: IBankPaymentInfo[];
  deposit?: ISystemPaymentMethod[];
  withdraw?: ISystemPaymentMethod[];
};

export type ISystemPaymentMethod = {
  name: string;
  description: string;
  maintain: string;
  tags: {
    name: string;
    img: string;
  };
  img: string;
};

export type IGetSystemCardPaymentResponse = {
  status: SystemCardPaymentResponseStatus;
  cardlist: ISystemPhoneCardPayment;
};

export enum SystemCardPaymentResponseStatus {
  USEABLE = 1,
}

export type ISystemPhoneCardPayment = {
  [key in SystemPhoneCardPaymentNameEnum]: ISystemPhoneCardPaymentInfo;
};

export enum SystemPhoneCardPaymentNameEnum {
  ZING = "ZING",
  VIETTEL = "VIETTEL",
  VINAPHONE = "VINAPHONE",
  MOBIFONE = "MOBIFONE",
}

export type IWithdrawCrypto = {
  id: number;
  amount: number;
  code: string;
  currency: string;
  network: string;
  wallet_address: string;
  ex_rate: string;
  created_time: Date;
  note: string;
  status: string;
  user_id: number;
};

export type ISystemPhoneCardPaymentInfo = {
  rate: number;
  value: number[];
  status: number;
};

// example
// b52_vgmn_108:17091280,
// go_qs_txgo:1014247603153
// ...
export type IJackpotMapData = Record<string, number>;

export type IJackpotSummary = {
  jackpotFishing: number;
  jackpotIngame: number;
  jackpotNohu: number;
};

export type IEventData = {
  alias: string;
  title: string;
  description: string;
  img: string;
  start_time: string;
  end_time: string;
  tags: IEventDataTags; // need to modify from array to obj on gw
  created_at: Date;
  updated_at: Date;
};

type IEventDataTags = {
  name: string;
  img: string;
};

export type IEventDetailData = {
  event_id: string;
  event_type: EventDetailTypeEnum;
  event_name: string;
  start_time: string;
  end_time: string;
  schedule_bonus: EventDetailScheduleBonusEnum;
  content: IContent;
  theme: ITheme;
  seo: ISEO;
  reward_periods: IRewardPeriod[];
  paths: string[];
};

export enum EventDetailTypeEnum {
  EVENT_TOP_DEPOSIT = "event_top_deposit",
  EVENT_TOP_TURNOVER = "event_top_turnover",
  EVENT_DEPOSIT_BONUS = "event_deposit_bonus",
  EVENT_COMMISSION_BONUS = "event_commission_bonus",
  REFUND_PROMOTION = "refund_promotion",
  DEPOSIT_PROMOTION = "deposit_promotion",
  BET_TICKET = "event_bet_ticket",
}

export enum EventDetailScheduleBonusEnum {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  ONCE = "once",
}

export type IRewardPeriod = {
  id: string;
  start_time: Date;
  end_time: Date;
  type: EventDetailScheduleBonusEnum;
  created_at: Date;
};

type IContent = {
  short_description: string;
  rules: string;
  how_to_participate: string;
  term_condition: string;
  award_structure: string;
  example: string;
  cta_background_color: string;
  cta_height: string;
  cta_navigation_link: string;
  cta_text: string;
  cta_width: string;
};

type ISEO = {
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  img: string;
};

// Chưa thấy chổ xài
type ITheme = {
  banner_landing_page: string;
  feature_image: string;
  theme_secondary_background_image: null;
  buttons: Record<string, string>[];
};

export type IEventStatisticData = {
  amount: number;
  username: string;
  home_name: string;
  away_name: string;
  reward: number;
};

export type IContact = {
  name: string;
  display_name: string;
  url: string;
  img: string;
  content: string;
};

export type ISystemService = {
  getSystemDepositPayment: () => Promise<ISystemDepositPayment>;
  refreshUserInfo: (headers: Record<string, unknown>) => Promise<IRefreshResponse["user"]>;
  getSystemCardPayment: () => Promise<IGetSystemCardPaymentResponse["cardlist"]>;
  getSystemPlan: () => Promise<ISystemPlan>;
  getSystemRankConfig: () => Promise<ISystemRankConfig>;
  getSystemBankPayment: () => Promise<ISystemBankPayment>;
  getNotification: () => Promise<IUserNoti[]>;
  getDepositCryptoNetwork: (network: string) => Promise<ICryptoV2SysDepositPaymentMethod[]>;
  withdrawCrypto: (payload: Record<string, undefined | string>) => Promise<IWithdrawCrypto>;
  getHeroBanners: () => Promise<IBanner[]>;
  getJackpotSummary: () => Promise<IJackpotSummary>;
  getJackpots: () => Promise<IJackpotMapData>;
  getPromotions: (params: { alias: string }) => Promise<IEventData[]>;
  getPromotionByAlias: (alias: string) => Promise<IEventDetailData>;
  getPromotionStatistic: (params: { alias: string; period_id?: string }) => Promise<IEventStatisticData[]>;
  getContacts: () => Promise<IContact[]>;
};

export type IAPEventStatisticResponse<T> = Omit<IApiResponse<unknown>, "data"> & {
  data: { top: T };
};
