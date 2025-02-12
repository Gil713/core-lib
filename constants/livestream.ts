enum GameTypeEnum {
  GAME = "game",
  CASINO = "casino",
}

enum IGameDenyInfoEnum {
  WELCOME = "WELCOME",
}
export type ILiveStream = {
  id: number;
  groupId: string;
  streamName: string;
  defaultBackground: string;
  name: string;
  deny_info: string;
  api: string;
  partner_game_id: string;
  partner: string;
  id_jackpot: string;
  game_type: GameTypeEnum;
};

export const NANO_PLAYER_SCRIPT_URL = "https://demo.nanocosmos.de/nanoplayer/api/release/nanoplayer.4.min.js";

export const LIVESTREAM_CONFIG = {
  DEFAULT_URL: "rtmp://bintu-splay.nanocosmos.de/splay",
  WSS: "wss://bintu-h5live-secure.nanocosmos.de/h5live/authstream",
  HLS: "https://bintu-h5live-secure.nanocosmos.de/h5live/authhttp/playlist.m3u8",
};

export const liveStreamList: ILiveStream[] = [
  {
    // TX live
    id: 1483,
    groupId: "360d8af8-5d64-43df-9bd9-fa91ad6f9c60",
    streamName: "XpjSI-X3Chu",
    defaultBackground: "livestream/default-taixiu-go.webp",
    name: "Tài Xỉu",
    deny_info: IGameDenyInfoEnum.WELCOME,
    api: "/gameUrl?partnerProvider=go&partnerGameId=qs_txgo-101",
    partner_game_id: "qs_txgo-101",
    partner: "go",
    id_jackpot: "go_qs_txgo-101",
    game_type: GameTypeEnum.GAME,
  },
  {
    // XĐ live
    id: 3558,
    groupId: "9291199a-50c5-434b-9e97-5aeb670927d1",
    streamName: "XpjSI-MsM1Y",
    defaultBackground: "livestream/default-xocdia-go.webp",
    name: "Xóc Đĩa",
    deny_info: IGameDenyInfoEnum.WELCOME,
    api: "/gameUrl?partnerProvider=go&partnerGameId=qs_xocdia-102",
    partner_game_id: "qs_xocdia-102",
    partner: "go",
    id_jackpot: "go_qs_xocdia-102",
    game_type: GameTypeEnum.GAME,
  },
  {
    // Bầu cua
    id: 3707,
    groupId: "41b93f00-3f85-4008-86e2-8e297e6799aa",
    streamName: "XpjSI-uWCBa",
    defaultBackground: "livestream/default-baucua-rik.webp",
    name: "Bầu Cua",
    deny_info: IGameDenyInfoEnum.WELCOME,
    api: "/gameUrl?partnerProvider=rik&partnerGameId=vgmn_108",
    partner_game_id: "vgmn_108",
    partner: "rik",
    id_jackpot: "rik_vgmn_108",
    game_type: GameTypeEnum.GAME,
  },
];
