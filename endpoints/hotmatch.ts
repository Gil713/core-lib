export const getHotmatchEndpoint = (apiPromotionVer: API_PROMOTION_VERSION = API_PROMOTION_VERSION.V1) => {
  const createPromotionEndpointWVersion = createPromotionEndpoint(apiPromotionVer);

  return {
    getHotMatch: () => createPromotionEndpointWVersion("hotmatch/hot"),
    getScheduleMatch: () => createPromotionEndpointWVersion("hotmatch/fixtureByDate"),
  };
};
