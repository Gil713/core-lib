/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

type IDataLayer = {
  [key: string]: any;
};
declare global {
  interface Window {
    NanoPlayer: any; // NanoPlayer does not provide type yet
    dataLayer?: IDataLayer[]; // use for GTM event tracking
  }
}

declare module "#app" {
  interface NuxtApp {
    $userService: IUserService;
    $depositService: IDepositService;
    $transactionHistoryService: ITransactionHistoryService;
    $betsHistoryService: IBetsHistoryService;
    $systemService: ISystemService;
    $withdrawService: IWithdrawService;
    $bonusService: IBonusService;
    $gameService: IGameService;
    $staticPageService: IStaticAndNewsService;
    $liveStreamService: ILiveStreamService;
    $sportService: ISportService;
  }
}

export {};
