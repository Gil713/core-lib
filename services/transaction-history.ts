import type { $Fetch } from "nitropack";

export const TransactionHistoryService = (fetchFn: $Fetch): ITransactionHistoryService => ({
  getListTransactionHistory: async (params?: Record<string, string | number>): Promise<ITransactionHistoryData[]> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params || {})
      .buildCredentials("include")
      .build();

    const rs = await fetchFn<IApiResponse<ITransactionHistoryData[]>>(
      getHistoryEndpoints().getTransactionHistory(),
      options,
    );

    return rs.data;
  },

  uploadImageTransaction: async (
    formData: FormData,
    header: { "Content-Type": string },
  ): Promise<IDetailTransactionResponse> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(formData)
      .buildHeader(header)
      .buildCredentials("include")
      .build();

    const rs = await fetchFn<IApiResponse<IUploadTransactionResponse>>(
      getHistoryEndpoints().uploadImageTransaction(),
      options,
    );

    return { data: rs.data, status: rs.status || 0 };
  },

  updateImageTransaction: async (id: string, params: { statement_img: string }): Promise<string> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(params)
      .buildCredentials("include")
      .build();

    const rs = await fetchFn<IApiResponse<string>>(getHistoryEndpoints().updateImageTransaction(id), options);

    return rs.message || "";
  },

  lastSuccessTransactionHistory: async (params: Record<string, string | number>): Promise<ITransactionHistoryData> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params || {})
      .buildCredentials("include")
      .build();

    const rs = await fetchFn<IApiResponse<ITransactionHistoryData>>(
      getHistoryEndpoints().getLastSuccessTransactionHistory(),
      options,
    );

    return rs.data;
  },

  getTransactionHistoryDetail: async (id: string): Promise<IBaseInvoice> => {
    const _options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();
    const rs = await fetchFn<IApiResponse<IBaseInvoice>>(
      getHistoryEndpoints().getTransactionHistoryDetail(id),
      _options,
    );

    return rs.data;
  },
});
