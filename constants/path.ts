export const ASSETS_IMG_PATH = "//";

// Base URLs {protocol}/BaseUrl/...
export enum BaseUrlEnum {
  GAME = "game",
  CASINO = "livecasino",
  SPORT = "the-thao",
  NEWS = "tin-tuc",
  PROMOTION = "khuyen-mai",
  ACCOUNT = "account",
  GUIDE = "huong-dan",
  INTRODUCTION = "gioi-thieu",
  MAINTENANCE = "bao-tri",
}

export enum BaseRouteNameEnum {
  NEWS_ALIAS = "tin-tuc-alias",
}

export enum MobileBaseUrlEnum {
  VERIFY_EMAIL = "verify-email",
}

const createCasinoPath = createPath(BaseUrlEnum.CASINO);
const createAccountPath = createPath(BaseUrlEnum.ACCOUNT);
const createGuidePath = createPath(BaseUrlEnum.GUIDE);
const createPromotionPath = createPath(BaseUrlEnum.PROMOTION);
const createSportPath = createPath(BaseUrlEnum.SPORT);
const createNewsPath = createPath(BaseUrlEnum.NEWS);
const createGamePath = createPath(BaseUrlEnum.GAME);
const createIntroductionPath = createPath(BaseUrlEnum.INTRODUCTION);
const createMaintenancePath = createPath(BaseUrlEnum.MAINTENANCE);
// abstract param as list to serve BA business
const APP_PARAM_MAP = {
  type: "type",
  page: "page",
  tab: "tab",
};

// ex: https://bu88.com/?a=1c71f1ddef78cbbbeb86948c74f16ca1&utm_source=vlxxmoe&utm_medium=topbanner1-728x90&utm_campaign=cpd&utm_term=sex
// key is use on query params, value is use as cookie key

export const MKT_PARAMS = {
  a: "aff_id",
  utm_source: "utm_source",
  source: "source",
  utm_campaign: "utm_campaign",
  utm_medium: "utm_medium",
  utm_term: "utm_term",
  utm_content: "utm_content",
};

// Page URLs
export const APP_PATH = {
  HOME: "/",

  NEWS_CATEGORY: createNewsPath("the-loai"),
  NEWS: createNewsPath(),

  GUIDE: createGuidePath(),
  GAME: createGamePath(),
  CASINO: createCasinoPath(),
  SPORT: createSportPath(),
  ACCOUNT: createAccountPath(),
  MAINTENANCE: createMaintenancePath(),

  PROMOTION: createPromotionPath(),
  PROMOTION_VIP: createPromotionPath("vip"),
  PROMOTION_CATEGORY: createPromotionPath("the-loai"),
  PROMOTION_DETAIL: createPromotionPath("detail"),

  NAPRUT: createAccountPath("nap-rut"), //MB only
  WITHDRAW: createAccountPath("withdraw"),
  WITHDRAW_CRYPTO: createAccountPath("withdraw/crypto"),
  WITHDRAW_BANK: createAccountPath("withdraw/bank"),
  WITHDRAW_CARD: createAccountPath("withdraw/card"),

  DEPOSIT: createAccountPath("deposit"),
  DEPOSIT_CRYPTO: createAccountPath("deposit/crypto"),
  DEPOSIT_CARD: createAccountPath("deposit/card"),
  DEPOSIT_BANK: createAccountPath("deposit/bank"),
  DEPOSIT_CODEPAY: createAccountPath(`deposit/bank?${APP_PARAM_MAP.type}=codepay`),
  DEPOSIT_CODEPAY2: createAccountPath(`deposit/bank?${APP_PARAM_MAP.type}=codepay2`),
  DEPOSIT_MOMO: createAccountPath(`deposit/ewallet?${APP_PARAM_MAP.type}=momo`),
  DEPOSIT_VIETTEL: createAccountPath(`deposit/ewallet?${APP_PARAM_MAP.type}=viettel`),
  DEPOSIT_ZALOPAY: createAccountPath(`deposit/ewallet?${APP_PARAM_MAP.type}=zalopay`),

  HISTORY: createAccountPath("history"), // MB only
  TRANSACTION_HISTORY: createAccountPath("history/transaction"),
  BET_HISTORY: createAccountPath("history/bet"),

  PROFILE: createAccountPath("profile"),
  BANK: createAccountPath("bank"),
  TRADING_P2P: createAccountPath("trading-p2p"),
  BONUS: createAccountPath("bonus"),

  // TODO: RECHECK TO KEEP OR NOT
  LO_DE: createGamePath(GameAliasEnum.LO_DE),
  BAN_CA: createGamePath(GameAliasEnum.BAN_CA),
  QUAY_SO: createGamePath(GameAliasEnum.QUAY_SO),
  TABLE_GAME: createGamePath(GameAliasEnum.TABLE_GAME),
  GAME_BAI: createGamePath(GameAliasEnum.GAME_BAI),
  SLOTS_GAME: createGamePath(GameAliasEnum.SLOTS),
  NO_HU: createGamePath(GameAliasEnum.NO_HU),
  INGAME: createGamePath("ingame"),
  QUICK_GAMES: createGamePath(GameAliasEnum.QUICK_GAMES),
  V_GAMING: createGamePath("v-gaming"),
  LIVE_STREAM: createGamePath("livestream"),
  DA_GA: createGamePath(GameAliasEnum.DA_GA),
  SANH_CASINO: createCasinoPath(GameAliasEnum.ALL),

  TAIXIU: createCasinoPath(GameAliasEnum.TAI_XIU),
  XOCDIA: createCasinoPath(GameAliasEnum.XOC_DIA),
  BAUCUA: createCasinoPath(GameAliasEnum.BAU_CUA),
  ROULETTE: createCasinoPath(GameAliasEnum.ROULETTE),
  BACCARAT: createCasinoPath(GameAliasEnum.BACCARAT),
  POKER: createCasinoPath(GameAliasEnum.POKER),
  SICBO: createCasinoPath(GameAliasEnum.SICBO),
  BLACKJACK: createCasinoPath(GameAliasEnum.BLACKJACK),
  DRAGONTIGER: createCasinoPath("dragontiger"),
  OTHERS: createCasinoPath(GameAliasEnum.OTHERS),
  LIVESTREAM: createCasinoPath("livestream"),

  VOLTA: createSportPath("volta"),
  E_SPORTS: createSportPath("the-thao-dien-tu"),
  VS_SPORTS: createSportPath("the-thao-ao"),
  MATCH_DETAIL: createSportPath("chi-tiet-tran-dau"),
  MATCH_SCHEDULE: createSportPath("lich-thi-dau"),
  I_SPORTS: createSportPath("isports"), // A_SPORT = Athena
  A_SPORTS: createSportPath("asports"), // A_SPORT = Athena
  C_SPORTS: createSportPath("csports"), // C_SPORT = Athena
  M_SPORTS: createSportPath("msports"), // C_SPORT = Athena
  T_SPORTS: createSportPath("tsports"), // C_SPORT = Athena
  K_SPORTS: createSportPath("ksports"),
  P_SPORTS: createSportPath("psports"),

  //
  INTRODUCTION: createIntroductionPath(),
  GENERAL_RULE: createIntroductionPath(`quy-dinh-chung`),
  TERM_CONDITION: createIntroductionPath(`dieu-khoan`),
  PRIVACY_POLICY: createIntroductionPath(`chinh-sach-bao-mat`),
};
