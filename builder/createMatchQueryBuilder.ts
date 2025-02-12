type IMatchQuery = Partial<Pick<IMatchDetailData, "match_id" | "league_id" | "live">>;

export default function createMatchQueryBuilder() {
  const query: IMatchQuery = {};

  return {
    buildMatchId(method: IMatchQuery["match_id"]) {
      query.match_id = method;
      return this;
    },

    buildLeagueId(body: IMatchQuery["league_id"]) {
      query.league_id = body;
      return this;
    },

    buildLive(credentials: IMatchQuery["live"]) {
      query.live = credentials;
      return this;
    },

    build(): IMatchQuery {
      return query;
    },
  };
}
