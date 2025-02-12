import type { LocationQuery } from "vue-router";

export type ISportUrlProvider = {
  maintenance: string; // TODO: need to be verify string or boolean
  url: string;
};

export enum SportProvidersEnum {
  KSPORTS = "ksports",
  CSPORTS = "csports",
  SSPORTS = "ssports",
  MSPORTS = "msports",
  TSPORTS = "tsports",
  VSPORTS = "virtual-sports",
  ESPORTS = "esports",
  PSPORTS = "psports",
  ASPORTS = "asports",
}

export type ISchedulePayload = {
  type: string;
  date: string;
};

export type IGetSportUrlPayload = {
  sportProvider: SportProvidersEnum;
  match?: Pick<IMatchDetailData, "match_id" | "league_id" | "live"> | LocationQuery;
};

export type IHotMatchPayload = {
  limit: number;
};

export type ISportService = {
  getSportUrl: (payload: IGetSportUrlPayload) => Promise<ISportUrlProvider>;
  getSchedule: (payload: ISchedulePayload) => Promise<IScheduleData>;
  getHotMatch: (payload: IHotMatchPayload) => Promise<IMatchDetailData[]>;
};
