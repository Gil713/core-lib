const REFRESH_INTERVAL = 30000;

const _useJackpot = () => {
  const { $systemService } = useNuxtApp();

  const jackpotSummary = ref<IJackpotSummary>();
  const jackpotMap = ref<IJackpotMapData>();

  const isLoadingJackpotMap = ref<boolean>(false);
  const isLoadingJackpotSummary = ref<boolean>(false);
  const jackpotAliasMap: Partial<Record<GameAliasEnum, keyof IJackpotSummary>> = {
    [GameAliasEnum.BAN_CA]: "jackpotFishing",
    [GameAliasEnum.NO_HU]: "jackpotNohu",
    [GameAliasEnum.TABLE_GAME]: "jackpotIngame",
  };

  const fetchJackpotSummary = async () => {
    isLoadingJackpotSummary.value = true;
    try {
      const summaryResponse = await $systemService.getJackpotSummary();
      jackpotSummary.value = summaryResponse;
    } catch (error) {
      console.error("Failed to fetch sum jackpot", error);
    }

    isLoadingJackpotSummary.value = false;
  };

  const fetchJackpotMap = async () => {
    isLoadingJackpotMap.value = true;

    try {
      const jackpotResponse = await $systemService.getJackpots();
      jackpotMap.value = jackpotResponse;
    } catch (error) {
      console.error("Failed to fetch jackpot", error);
    } finally {
      isLoadingJackpotMap.value = false;
    }
  };

  const {
    pause: pauseFetchJackpotInterval,
    resume: resumeFetchJackpotInterval,
    isActive: isFetchJackpotIntervalActive,
  } = useIntervalFn(
    async () => {
      if (isLoadingJackpotMap.value || isLoadingJackpotSummary.value) return;

      await Promise.all([fetchJackpotMap(), fetchJackpotSummary()]);
    },
    REFRESH_INTERVAL,
    { immediate: true },
  );

  useAsyncData(
    "jackpot",
    async () => {
      await Promise.all([fetchJackpotMap(), fetchJackpotSummary()]);
    },
    {
      server: false,
    },
  );

  const getJackpotByAliasId = (aliasId: keyof IJackpotMapData) => {
    if (!jackpotMap.value) return undefined;

    return jackpotMap.value[aliasId];
  };

  const getJackpotSummaryByAlias = (alias: GameAliasEnum) => {
    const jackpotSumKey = jackpotAliasMap[alias];
    if (!jackpotSumKey || !jackpotSummary.value) return;
    return jackpotSummary.value[jackpotSumKey];
  };

  return {
    isFetchJackpotIntervalActive,
    fetchJackpotSummary,
    fetchJackpotMap,
    pauseFetchJackpotInterval,
    resumeFetchJackpotInterval,
    getJackpotByAliasId,
    getJackpotSummaryByAlias,
  };
};

export const useJackpot = createSharedComposable(_useJackpot);
