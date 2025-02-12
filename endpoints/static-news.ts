export const getStaticAndNewsEndPoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getCategories: () => createBaseEndpointWVersion("brand/category"),
    getDetails: (alias: string) => createBaseEndpointWVersion("brand/news/" + alias),
    getStaticNews: () => createBaseEndpointWVersion("brand/news"),
  };
};
