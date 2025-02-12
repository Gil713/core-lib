type IUserOptions = {
  apiBaseVer?: API_BASE_VERSION;
  apiPromotionVer?: API_PROMOTION_VERSION;
};

export const getUserEndpoints = ({
  apiBaseVer = API_BASE_VERSION.V1,
  apiPromotionVer = API_PROMOTION_VERSION.V1,
}: IUserOptions = {}) => {
  const createBaseEndpointWVersion = createBaseEndpoint(apiBaseVer);
  const createPromotionEndpointWVersion = createPromotionEndpoint(apiPromotionVer);

  return {
    register: () => createBaseEndpointWVersion("register"),
    logIn: () => createBaseEndpointWVersion("login"),
    logOut: () => createBaseEndpointWVersion("logout"),
    forgotPassword: () => createBaseEndpointWVersion("forgotPassword"),
    resetPassword: () => createBaseEndpointWVersion("resetPassword"),
    verifyEmail: () => createBaseEndpointWVersion("verifyEmail"),
    updatePassword: () => createBaseEndpointWVersion("updatePassword"),
    updateInfo: () => createBaseEndpointWVersion("updateInfo"),
    sendVerifyEmail: () => createBaseEndpointWVersion("user/send-verify-email"),
    verifyEmailToken: () => createBaseEndpointWVersion("user/verify-email-token"),
    cancelPromotion: () => createBaseEndpointWVersion("payment/cancelpromotion"),
    addBanks: () => createBaseEndpointWVersion("user/banks"),
    getBanks: () => createBaseEndpointWVersion("user/banks"),
    getUserRank: () => createPromotionEndpointWVersion("user/rank"),
    verifyExistEmail: () => createBaseEndpointWVersion("verifyEmail"),
  };
};
