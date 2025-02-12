export const useBonus = () => {
  const { $bonusService } = useNuxtApp();
  const appStore = useAppStore();

  const { systemPlan } = storeToRefs(appStore);
  const { userRank } = useUserRank();
  const { gameRefundRates } = useSystemRankConfig();

  const summaryData = ref<ISummaryBonus | undefined>(undefined);
  const yesterdayCommission = ref<number>(0);

  const hasPromotion = computed<boolean>(() => systemPlan.value?.package_id !== undefined);
  const isCommission = computed<boolean>(() => systemPlan.value?.package_id === PackageEnum.HOAN_TRA);
  const promotionName = computed<string>(() => systemPlan.value?.name.toUpperCase() || "");

  const statisticList = computed<IBonusStatisticItem[]>(() =>
    createStatisticData(yesterdayCommission.value, summaryData.value, appStore.systemPlan),
  );

  const bonusData = computed<IBonusItem>(() => {
    if (!hasPromotion.value) {
      return {
        overviews: [],
        details: [],
      };
    }
    if (isCommission.value) {
      return commissionPromotion(gameRefundRates.value ?? [], userRank.value ?? 0);
    }
    return otherPromotion(appStore.systemPlan);
  });

  const fetchSummary = async () => {
    try {
      const summaryResponse = await $bonusService.getSummaryBonus();
      summaryData.value = {
        ...summaryResponse,
        deposit: Math.round(summaryResponse.deposit * RATE_K_VND),
        commission: Math.round(summaryResponse.commission * RATE_K_VND),
        promotion: Math.round(summaryResponse.promotion * RATE_K_VND),
        winlost: Math.round(summaryResponse.winlost * RATE_K_VND),
        rolling: Math.round(summaryResponse.rolling * RATE_K_VND),
      };
    } catch (error) {
      useLogError(error);
    }
  };

  const fetchYesterdayCommission = async () => {
    try {
      const commissionResponse = await $bonusService.getBonusCommission({
        commissionType: CommissionEnum.YESTERDAY,
      });
      yesterdayCommission.value = commissionResponse.commission;
    } catch (error) {
      useLogError(error);
    }
  };

  const initData = () => {
    fetchSummary();
    fetchYesterdayCommission();
  };

  const goToPromotion = () => navigateTo(APP_PATH.PROMOTION);

  return {
    statisticList,
    bonusData,
    hasPromotion,
    goToPromotion,
    isCommission,
    userRank,
    initData,
    systemPlan,
    promotionName,
  };
};
