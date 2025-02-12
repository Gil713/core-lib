import type { $Fetch } from "nitropack";

export const DepositService = (fetchFn: $Fetch): IDepositService => ({
  depositNicePay: async (params: Record<string, string | number>): Promise<IDepositCodePay> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();
    const rs = await fetchFn<IApiResponse<IDepositCodePay>>(getDepositEndpoints().depositNicePay(), options);

    return rs.data;
  },
  depositGoPay: async (body: Record<string, string | number>): Promise<IDepositCodePay> => {
    const options = createFetchOptionsBuilder().buildMethod("POST").buildBody(body).buildCredentials("include").build();
    const rs = await useNuxtApp().$api<IApiResponse<IDepositCodePay>>(
      getDepositEndpoints().depositProviderGoPay(),
      options,
    );

    return rs.data;
  },
  getEWalletTransferCode: async (): Promise<IEWalletTransferCodeResponse["code"]> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").build();

    const res = await fetchFn<IApiResponse<IEWalletTransferCodeResponse>>(
      getDepositEndpoints().getEWalletTransferCode(),
      options,
    );

    return res.data.code;
  },
  sendDepositCardRequest: async (params: IDepositPhoneCardBody): Promise<IDepositCardResponse> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(params)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IDepositCardResponse>>(getDepositEndpoints().getDepositCard(), options);

    return res.data;
  },
});
