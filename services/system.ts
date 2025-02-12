import type { $Fetch } from "nitropack";

export const SystemService = (fetchFn: $Fetch): ISystemService => ({
  getSystemDepositPayment: async (): Promise<ISystemDepositPayment> => {
    const res = await fetchFn<IApiResponse<ISystemDepositPayment>>(getSystemEndpoints().getSystemDepositPayment());

    return res.data;
  },
  refreshUserInfo: async (headers: Record<string, unknown>): Promise<IRefreshResponse["user"]> => {
    const res = await fetchFn<IRefreshResponse>(getSystemEndpoints().refreshUserInfo(), headers);

    return res.user;
  },
  getSystemCardPayment: async (): Promise<IGetSystemCardPaymentResponse["cardlist"]> => {
    const res = await fetchFn<IGetSystemCardPaymentResponse>(getSystemEndpoints().getSystemCardPayment());

    return res.cardlist;
  },
  getSystemPlan: async (): Promise<ISystemPlan> => {
    const res = await fetchFn<IApiResponse<ISystemPlan>>(getSystemEndpoints().getSystemPlan());

    return res.data;
  },
  getSystemRankConfig: async (): Promise<ISystemRankConfig> => {
    const res = await fetchFn<IApiResponse<ISystemRankConfig>>(getSystemEndpoints().getSystemRankConfig());

    return res.data;
  },
  getSystemBankPayment: async (): Promise<ISystemBankPayment> => {
    const res = await fetchFn<IApiResponse<ISystemBankPayment>>(getSystemEndpoints().getSystemBankPayment());

    return res.data;
  },
  getNotification: async (): Promise<IUserNoti[]> => {
    const notiOption = createFetchOptionsBuilder().buildMethod("GET").build();

    const res = await fetchFn<IApiResponse<IUserNoti[]>>(getSystemEndpoints().getNotification(), notiOption);

    return res.data;
  },
  getDepositCryptoNetwork: async (network: string): Promise<ICryptoV2SysDepositPaymentMethod[]> => {
    const res = await fetchFn<IApiResponse<ICryptoV2SysDepositPaymentMethod[]>>(
      getDepositEndpoints().cryptoTransferAddress(network),
      {
        params: createBaseParamsBuilder().build(),
      },
    );

    return res.data;
  },
  withdrawCrypto: async (payload: Record<string, undefined | string>): Promise<IWithdrawCrypto> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IWithdrawCrypto>>(getWithdrawEndpoints().getCryptoWithdraw(), options);

    return res.data;
  },
  getHeroBanners: async (): Promise<IBanner[]> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();
    const res = await fetchFn<IApiResponse<IBanner[]>>(getSystemEndpoints().getHomepageBanner(), options);

    return res.data;
  },
  getJackpotSummary: async (): Promise<IJackpotSummary> => {
    const res = await fetchFn<IApiResponse<IJackpotSummary>>(getSystemEndpoints().geJackpotSummary());

    return res.data;
  },
  getJackpots: async (): Promise<IJackpotMapData> => {
    const res = await fetchFn<IApiResponse<IJackpotMapData>>(getSystemEndpoints().getJackpots());

    return res.data;
  },
  getPromotions: async (params: { alias: string }): Promise<IEventData[]> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IEventData[]>>(getSystemEndpoints().getPromotions(), options);

    return res.data;
  },
  getPromotionByAlias: async (alias: string): Promise<IEventDetailData> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();
    const res = await fetchFn<IApiResponse<IEventDetailData>>(
      getSystemEndpoints().getPromotions() + `/${alias}`,
      options,
    );

    return res.data;
  },
  getPromotionStatistic: async (params: { alias: string; period_id?: string }): Promise<IEventStatisticData[]> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IAPEventStatisticResponse<IEventStatisticData[]>>(
      getSystemEndpoints().getPromotionStatistic(),
      options,
    );

    return res.data.top;
  },

  getContacts: async (): Promise<IContact[]> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();

    const res = await fetchFn<IApiResponse<IContact[]>>(getSystemEndpoints().getContacts(), options);

    return res.data;
  },
});
