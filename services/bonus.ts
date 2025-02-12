import type { $Fetch } from "nitropack";

export const BonusService = (fetchFn: $Fetch): IBonusService => ({
  getSummaryBonus: async (): Promise<ISummaryBonus> => {
    const res = await fetchFn<IApiResponse<ISummaryBonus>>(getBonusEndpoints().getSummaryBonus());

    return res.data;
  },
  getBonusCommission: async ({ commissionType }: IBonusCommissionOpts): Promise<ICommissionBonus> => {
    const params = createCommissionParamsBuilder().buildType(commissionType).build();
    const options = createFetchOptionsBuilder().buildParams(params).build();

    const res = await fetchFn<IApiResponse<ICommissionBonus>>(getBonusEndpoints().getBonusCommission(), options);

    return res.data;
  },
});
