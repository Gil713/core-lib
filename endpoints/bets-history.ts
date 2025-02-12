export const getBetsHistoryEndpoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    betsHistory: () => createBaseEndpointWVersion("lsbAll"),
  };
};
