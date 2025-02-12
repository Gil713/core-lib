type ISystemOptions = {
  apiBaseVer?: API_BASE_VERSION;
  apiPromotionVer?: API_PROMOTION_VERSION;
};

export const getSystemEndpoints = ({
  apiBaseVer = API_BASE_VERSION.V1,
  apiPromotionVer = API_PROMOTION_VERSION.V1,
}: ISystemOptions = {}) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);
  const createPromotionEndpointWVersion = createPromotionEndpoint(apiPromotionVer);

  return {
    refreshUserInfo: () => createBaseEndpointWVersion("refresh"),
    getSystemDepositPayment: () => createBaseEndpointWVersion("payment/indexdeposit"),
    getSystemCardPayment: () => createBaseEndpointWVersion("payment/gwinfo"),
    getSystemPlan: () => createBaseEndpointWVersion("account/plan"),
    getSystemRankConfig: () => createPromotionEndpointWVersion("rank/config"),
    getSystemBankPayment: () => createBaseEndpointWVersion("brand/payment"),
    getNotification: () => createPromotionEndpointWVersion("notify"),
    getHomepageBanner: () => createBaseEndpointWVersion("brand/banner"),
    getJackpots: () => createBaseEndpointWVersion("slot/jackpot"),
    geJackpotSummary: () => createBaseEndpointWVersion("slot/sumjackpot"),
    getPromotions: () => createBaseEndpointWVersion("brand/event"),
    getPromotionStatistic: () => createBaseEndpointWVersion("brand/event-statistic"),
    getContacts: () => createBaseEndpointWVersion("brand/contact"),
  };
};
