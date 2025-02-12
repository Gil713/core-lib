export type IBetsHistory = {
  ticket_status: string;
  battle_id: number;
  agency_id: number;
  agency_transaction_id: string;
  game_round_id: string;
  turnover: number;
  stake: number;
  game_stake: number;
  winlost: number;
  game_tax: number;
  game_refund: number;
  game_reserve: number;
  net_turnover: number;
  amount_before: number;
  amount_after: number;
  amount_after_winlost: number;
  game_bet_value: number;
  product: string;
  sub_partner_code: string;
  go_game_id: string;
  go_game_name: string;
  currency: string;
  currency_rate: number;
  ex_game_stake: number;
  ex_game_winlost: number;
  ex_game_tax: number;
  ex_game_reserve: number;
  ex_game_refund: number;
  ex_amount_after: number;
  ex_amount_after_winlost: number;
  time: string;
  updated_time: number;
  return_datetime: Date;
  note: string;
  branch: string;
  platform_id: number;
  platform_name: string;
  is_v2: boolean;
  source: string;
  aff_id: string;
  created_time: Date;
  last_updated_time: Date;
  id: number;
  id_as_str: string;
  game_type: string;
  title: string;
  amount: string | number;
  win_loss: string | number;
  status: string;
  icon: string;
  status_class: string;
};

export type IHistoryBetsResponse = {
  data: IBetsHistory[];
  total: number;
};

export enum ClassCustomBets {
  WIN = "bet-win",
  WON = "bet-won",
  LOSE = "bet-lose",
  TIP = "tip",
  CANCEL = "bet-cancel",
  REJECT = "bet-reject",
  RUNNING = "bet-running",
  DRAW = "bet-draw",
  HALF_WON = "bet-half-won",
  HALF_LOSE = "bet-half-lose",
  REFUND = "bet-refund",
  PROCESSING = "bet-processing",
}

export enum StatusBets {
  WIN = "win",
  WON = "won",
  LOSE = "lose",
  TIP = "tip",
  CANCEL = "cancel",
  REJECT = "reject",
  RUNNING = "running",
  DRAW = "draw",
  HALF_WON = "half won",
  HALF_LOSE = "half lose",
  REFUND = "refund",
  PROCESSING = "processing",
}

export enum BetLabel {
  HISTORY_BETS = "Lịch sử cá cược của bạn trong vòng 7 ngày gần nhất.",
  WIN = "Thắng",
  LOSE = "Thua",
  TIP = "Tip",
  CANCEL = "Hủy kèo",
  PROCESSING = "Đang xử lý",
  DRAW = "Hòa",
  HALF_WON = "Thắng 1/2",
  HALF_LOSE = "Thua 1/2",
  REFUND = "Hoàn tiền",
  PLAY = "Chơi",
  BET = "Cược",
}

export enum GameBets {
  SPORTBOOKS = "sportbooks",
  ESPORT = "esport",
}

export enum TypeGame {
  SPORT = "SPORT",
}

export type IBetsHistoryService = {
  getListBetsHistory: (payload?: Record<string, string | number>) => Promise<IHistoryBetsResponse>;
};
