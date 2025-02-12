type ITeam = {
  name: string;
  flag_thumbnail: string;
};

type IOdds = {
  rate: number;
  odds: number;
  favorite: boolean;
};

type IMatchOdds = {
  hTeam: IOdds;
  aTeam: IOdds;
  favorite: boolean;
};

export type IMatchDetailData = IMatchOdds & {
  teams: ITeam[];
  league_name: string;
  league_name_text: string;
  league_image: string;
  league_id: number;
  match_id: number;
  text_time: string;
  overFT: IMatchOdds;
  athena_league_id: number;
  athena_match_id: number;
  athena_ahFT: IMatchOdds;
  athena_ahHT: IMatchOdds;
  athena_overFT: IMatchOdds;
  athena_overHT: IMatchOdds;
  athena_winFT: IMatchOdds;
  athena_winHT: IMatchOdds;
  ahFT: IMatchOdds;
  ahHT: IMatchOdds;
  overHT: IMatchOdds;
  winFT: IMatchOdds;
  winHT: IMatchOdds;
  ileague_id: string;
  imatch_id: string;
  iLeagueName: string;
  homeId: string;
  awayId: string;
  // TODO: need to ve verify relationship of ksport_match_id and match_id, ksport_league_id, live
  ksport_match_id: number;
  ksport_league_id: number;
  live: string;
};

export type IScheduleData = {
  [key: string]: IMatchDetailData[];
};
