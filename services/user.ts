import type { $Fetch } from "nitropack";

export const UserService = (fetchFn: $Fetch): IUserService => ({
  registerUser: async (payload: IRegisterBody): Promise<IApiResponse<IUserInfo[]>> => {
    const registerFetchOptions = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IUserInfo[]>>(getUserEndpoints().register(), registerFetchOptions);

    return res;
  },
  logIn: async (payload: ILoginBody): Promise<IApiResponse<IUserInfo[]>> => {
    const loginFetchOptions = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IUserInfo[]>>(getUserEndpoints().logIn(), loginFetchOptions);

    if (res.status !== ResponseStatusEnum.OK) {
      new Error("login:: response status not OK!");
    }

    return res;
  },
  updateInfo: async (updateInfoBody: IUpdateInfoBody): Promise<boolean> => {
    const updateInfoFetchOptions = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(updateInfoBody)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IUserInfo[]>>(getUserEndpoints().updateInfo(), updateInfoFetchOptions);

    if (res.status !== ResponseStatusEnum.OK) {
      throw createError("updateInfo:: response status not OK!");
    }

    return true;
  },
  logOut: async (): Promise<IApiResponseWithoutData> => {
    const logoutFetchOptions = createFetchOptionsBuilder().buildMethod("POST").buildCredentials("include").build();
    const res = await fetchFn<IApiResponseWithoutData>(getUserEndpoints().logOut(), logoutFetchOptions);

    if (res.status !== ResponseStatusEnum.OK) {
      throw new Error("Logout Failed!");
    }

    return res;
  },
  addUserBankInfo: async (payload: Record<string, string>): Promise<ISystemUserBankPaymentMethod> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<ISystemUserBankPaymentMethod>>(getUserEndpoints().addBanks(), options);

    if (res.status !== ResponseStatusEnum.OK) {
      throw new Error("addUserBankInfo:: response status not OK!");
    }

    if (!res.data) {
      throw new Error(`addUserBankInfo:: response invalid data: ${res.data}`);
    }

    return res.data;
  },
  getUserRank: async (): Promise<IUserRankData["level"]> => {
    const res = await fetchFn<IApiResponse<IUserRankData>>(getUserEndpoints().getUserRank());

    if (res.status !== ResponseStatusEnum.OK) {
      throw new Error("getUserRank:: response status not OK!");
    }

    if (!res.data) {
      throw new Error(`getSystemRankConfig:: response invalid data: ${res.data}`);
    }

    return res.data.level;
  },
  updateProfileInfo: async (payload: Record<string, string>): Promise<string> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();
    const res = await fetchFn<IUpdateProfileInfoResponse>(getUserEndpoints().updateInfo(), options);

    return res.user.email;
  },
  updatePassword: async (payload: Record<string, string | undefined>): Promise<string | undefined> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();
    const res = await fetchFn<IApiResponseWithoutData>(getUserEndpoints().updatePassword(), options);

    return res.message;
  },
  sendVerifyEmail: async (params: { email: string }): Promise<string | undefined> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();
    const res = await fetchFn<IApiResponseWithoutData>(getUserEndpoints().sendVerifyEmail(), options);

    return res.message;
  },
  verifyEmailByToken: async (params: { token: string }): Promise<boolean> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();
    const res = await fetchFn<IApiResponseWithoutData>(getUserEndpoints().verifyEmailToken(), options);

    return res.status === ResponseStatusEnum.OK;
  },
  cancelPromotion: async (): Promise<IApiResponseWithoutData> => {
    const options = createFetchOptionsBuilder().buildMethod("POST").buildCredentials("include").build();
    return await fetchFn<IApiResponseWithoutData>(getUserEndpoints().cancelPromotion(), options);
  },
  forgotPassword: async (payload: Record<string, string | undefined>): Promise<IApiResponseWithoutData> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();
    const res = await fetchFn<IApiResponseWithoutData>(getUserEndpoints().forgotPassword(), options);

    return res;
  },
  verifyExistEmail: async (payload: IForgotPasswordBody): Promise<void> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    try {
      const res = await fetchFn<Promise<IVerifyExistEmailResponse>>(getUserEndpoints().verifyExistEmail(), options);
      if (!res.exist) throw new Error();
    } catch {
      throw new Error("Email chưa được đăng ký");
    }
  },
  resetPassword: async (payload: IResetPasswordBody): Promise<IApiResponseWithoutData> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    try {
      const res = await fetchFn<IApiResponseWithoutData>(getUserEndpoints().resetPassword(), options);
      if (res.status === ResponseStatusEnum.VALIDATE_FAILED) throw new Error(res.message);
      return res;
    } catch {
      throw new Error("Kích hoạt khôi phục mật khẩu đã hết hạn. Vui lòng thử lại.");
    }
  },
});
