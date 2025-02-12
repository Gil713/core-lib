export const getHistoryEndpoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getTransactionHistory: () => createBaseEndpointWVersion("lsgd"),
    getTransactionHistoryDetail: (id: string) => createBaseEndpointWVersion(`payment/invoice/${id}`),
    getLastSuccessTransactionHistory: () => createBaseEndpointWVersion("lsgd/last-success"),
    uploadImageTransaction: () => createBaseEndpointWVersion("transaction"),
    updateImageTransaction: (id: string) => createBaseEndpointWVersion(`payment/binary/statement/${id}`),
  };
};
