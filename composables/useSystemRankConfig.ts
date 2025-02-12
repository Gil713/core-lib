export const useSystemRankConfig = () => {
  const nuxt = useNuxtApp();

  const {
    data: systemRankConfig,
    status,
    error,
  } = useApi<ISystemRankConfig>(
    "getSystemRankConfig",
    async () => {
      const res = await nuxt.$systemService.getSystemRankConfig();
      return res;
    },
    {
      server: false,
    },
  );

  const gameRefundRates = computed<IGameRate[]>(() =>
    gameCategories
      .map((item) => ({
        ...item,
        rates: systemRankConfig.value?.refundRanges ? systemRankConfig.value.refundRanges[item.key] : [],
      }))
      .filter((obj) => (obj.rates?.length || 0) > 0),
  );

  return {
    systemRankConfig,
    gameRefundRates,
    status,
    error,
  };
};
