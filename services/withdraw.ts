import type { $Fetch } from "nitropack";

export const WithdrawService = (fetchFn: $Fetch): IWithdrawService => ({
  getWithdrawCard: async (payload: IWithdrawCardBody): Promise<IWithdrawCardResponse> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IWithdrawCardResponse>>(getWithdrawEndpoints().getWithdrawCard(), _options);

    return res.data;
  },
  getWithdrawBank: async (payload: IWithdrawBankBody): Promise<IWithdrawBankData> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IWithdrawBankData>>(getWithdrawEndpoints().getWithdrawBank(), _options);

    return res.data;
  },
});
