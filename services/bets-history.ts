import type { $Fetch } from "nitropack";

export const BetsHistoryService = (fetchFn: $Fetch): IBetsHistoryService => ({
  getListBetsHistory: async (payload?: Record<string, string | number>): Promise<IHistoryBetsResponse> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(payload || {})
      .buildCredentials("include")
      .build();
    const rs = await fetchFn<IApiResponse<IBetsHistory[]>>(getBetsHistoryEndpoints().betsHistory(), _options);
    if (rs.status !== ResponseStatusEnum.OK) {
      throw new Error(rs.message);
    }

    return { data: rs.data, total: rs.total || 0 };
  },
});
