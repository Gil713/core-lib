export const getGameEndpoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getGenericGames: () => createBaseEndpointWVersion("brand/games"),
    getLiveCasinoGames: () => createBaseEndpointWVersion("brand/livecasino"),
    getGameAliases: () => createBaseEndpointWVersion("brand/category"),
    getGamePlayUrl: () => createBaseEndpointWVersion("gameUrl"),
    getLivecasinoPlayUrl: () => createBaseEndpointWVersion("casinoUrl"),
    getLiveStream: () => "https://api-csn-s.gameland.today/api/v1/stream/",
  };
};
