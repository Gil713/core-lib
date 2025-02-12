type ISportParam = {
  matchId: IMatchDetailData["match_id"];
  leagueId: IMatchDetailData["league_id"];
  loginPath: string;
  registerPath: string;
  utm_source: string;
  live: string;
  path_alias: string;
};

export default function createSportParamsBuilder() {
  const params: Partial<ISportParam> = {};
  const baseBuilder = createBaseParamsBuilder<ISportParam>(params);

  return {
    ...baseBuilder,
    buildPathAlias(pathAlias: ISportParam["path_alias"]) {
      params.path_alias = pathAlias;
      return this;
    },

    buildMatchId(matchId: ISportParam["matchId"]) {
      params.matchId = matchId;
      return this;
    },

    buildLeagueId(leagueId: ISportParam["leagueId"]) {
      params.leagueId = leagueId;
      return this;
    },

    buildLoginPath(loginPath: ISportParam["loginPath"]) {
      params.loginPath = loginPath;
      return this;
    },

    buildRegisterPath(registerPath: ISportParam["registerPath"]) {
      params.registerPath = registerPath;
      return this;
    },

    buildUtmSource() {
      params.utm_source = useNuxtApp().$domainUrl;
      return this;
    },

    buildLive(live: ISportParam["live"]) {
      params.live = live;
      return this;
    },

    build(): Partial<ISportParam> {
      return params;
    },
  };
}
