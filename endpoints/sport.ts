export const getSportEndpoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getAthenaSportUrl: () => createBaseEndpointWVersion("athena/sportUrl"),
    getAthenaESportUrl: () => createBaseEndpointWVersion("athena/esportsUrl"),
    getAthenaVirtualSportUrl: () => createBaseEndpointWVersion("athena/virtualSportUrl"),
    getKSportUrl: () => createBaseEndpointWVersion("tp/ksportUrl"),
    getSSportUrl: () => createBaseEndpointWVersion("ssportUrl"),
    getImSportUrl: () => createBaseEndpointWVersion("imsportUrl"),
    getTSportUrl: () => createBaseEndpointWVersion("tp/tsportUrl"),
  };
};
