import type { $Fetch } from "nitropack";

export const GameService = (fetchFn: $Fetch): IGameService => ({
  getGames: async (fetchOptions: IFetchGamesOptions): Promise<IGamesResponse> => {
    const { type, alias, provider, sortBy, page = 1, limit } = fetchOptions;
    const params = createFetchGamesParamsBuilder()
      .buildProvider(provider)
      .buildPathAlias(alias)
      .buildPage(page)
      .buildLimit(limit)
      .buildSortBy(sortBy)
      .build();

    const endpoint =
      type === GameTypeEnum.CASINO ? getGameEndpoints().getLiveCasinoGames() : getGameEndpoints().getGenericGames();

    const res = await fetchFn<IApiResponse<IGamesResponse>>(
      endpoint,
      createFetchOptionsBuilder().buildMethod("GET").buildParams(params).buildCredentials("include").build(),
    );

    return res.data;
  },

  getAliases: async (fetchOptions: IFetchAliasesOptions): Promise<IGameAlias[]> => {
    const { type } = fetchOptions;
    const params = createFetchGameAliasesParamsBuilder()
      .buildAlias(type === GameTypeEnum.GAME ? "game" : "livecasino")
      .build();

    const endpoint = getGameEndpoints().getGameAliases();

    const res = await fetchFn<IApiResponse<IGameAlias[]>>(
      endpoint,
      createFetchOptionsBuilder().buildMethod("GET").buildParams(params).buildCredentials("include").build(),
    );

    return res.data;
  },

  getGamePlay: async (fetchOptions: IFetchGamePlayOptions): Promise<IGamePlay> => {
    const params = createFetchGamePlayParamsBuilder()
      .buildGameId(fetchOptions.partnerGameId)
      .buildProvider(fetchOptions.partnerProvider)
      .buildRoute(fetchOptions.route)
      .buildTrial(fetchOptions.isTrial)
      .build();

    const endpoint =
      fetchOptions.gameType === GameTypeEnum.CASINO
        ? getGameEndpoints().getLivecasinoPlayUrl()
        : getGameEndpoints().getGamePlayUrl();

    const res = await fetchFn<IApiResponse<IGamePlay>>(
      endpoint,
      createFetchOptionsBuilder().buildMethod("GET").buildParams(params).buildCredentials("include").build(),
    );

    return res.data;
  },
});
