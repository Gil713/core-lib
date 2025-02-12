export type IGameRate = {
  label: string;
  key: IGameKey;
  rates: number[];
};

export enum GameAliasEnum {
  ALL = "all",
  SPORTS = "sports",
  TABLE_GAME = "table-game",
  QUAY_SO = "quay-so",
  GAME_BAI = "game-bai",
  NO_HU = "no-hu",
  LO_DE = "lo-de",
  BAN_CA = "ban-ca",
  SLOTS = "slots",
  QUICK_GAMES = "game-nhanh",
  DA_GA = "da-ga",
  TAI_XIU = "tai-xiu",
  XOC_DIA = "xoc-dia",
  BAU_CUA = "bau-cua",
  BACCARAT = "baccarat",
  BLACKJACK = "blackjack",
  ROULETTE = "roulette",
  POKER = "poker",
  SICBO = "sicbo",
  TV_SHOW = "tv-show",
  OTHERS = "others",
}
