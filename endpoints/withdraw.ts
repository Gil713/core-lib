export const getWithdrawEndpoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    getCryptoWithdraw: () => createBaseEndpointWVersion("payment/crypto/withdraw"),
    getWithdrawCard: () => createBaseEndpointWVersion("payment/withdrawcard"),
    getWithdrawBank: () => createBaseEndpointWVersion("payment/withdrawbank"),
  };
};
