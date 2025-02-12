type IBonusOptions = {
  apiBaseVer?: API_BASE_VERSION;
};

export const getBonusEndpoints = ({ apiBaseVer = API_BASE_VERSION.V1 }: IBonusOptions = {}) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getSummaryBonus: () => createBaseEndpointWVersion("account/summary"),
    getBonusCommission: () => createBaseEndpointWVersion("account/commission"),
  };
};
