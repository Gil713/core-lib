export const getDepositEndpoints = (apiBaseVer: API_BASE_VERSION = API_BASE_VERSION.V1) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);

  return {
    cryptoTransferAddress: (network: string) =>
      createBaseEndpointWVersion(`payment/crypto/get-tranfer-address?network=${network}`),
    depositNicePay: () => createBaseEndpointWVersion("payment/nicepay"),
    depositProviderGoPay: () => createBaseEndpointWVersion("payment/deposit-provider"),
    getEWalletTransferCode: () => createBaseEndpointWVersion("user/momo/code"),
    getDepositCard: () => createBaseEndpointWVersion("payment/depositcard"),
  };
};
