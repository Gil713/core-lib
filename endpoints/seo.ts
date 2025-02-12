export const getSeoEndPoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getSeoInfo: () => createBaseEndpointWVersion("brand/seo"),
    getBrandInfo: () => createBaseEndpointWVersion("brand/info"),
  };
};
