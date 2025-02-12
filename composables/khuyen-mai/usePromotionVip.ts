//TODO: Mei move hinh vip/12345.webp ra lib
// import type { AsyncDataRequestStatus } from "#app";
export type IGameRateTableData = { headers: { title: string; icon?: string; level?: number }[]; rows: IGameRate[] };
export type ILevelItem = {
  amountVND: string;
  icon: string;
  levelLabel: string;
  description: string;
  isActive?: boolean;
};
export const usePromotionVip = () => {
  const appStore = useAppStore();

  const { userRank, status: userRankStatus, refreshUserRank } = useUserRank();

  watch(
    () => appStore.isLoggedIn,
    (newVal) => {
      if (newVal) {
        refreshUserRank();
      }
    },
  );

  const {
    systemRankConfig,
    gameRefundRates,
    status: systemRankConfigStatus,
    error: systemRankConfigError,
  } = useSystemRankConfig();

  const isLoading = computed(() => {
    const status = [systemRankConfigStatus.value, userRankStatus.value];
    return status.includes("pending") || status.includes("idle");
  });
  const isError = computed(() => systemRankConfigError.value);

  const levelItems = computed<ILevelItem[]>(() => {
    const ranks = systemRankConfig.value?.ranks || [];
    return ranks.map((item) => {
      return {
        amountVND: item.up_rank_amount ? `+${formatVNDCurrency(item.up_rank_amount)}` : "",
        icon: `vip/${item.level + 1}.webp`,
        levelLabel: item.label,
        description: `Nạp ${formatVNDCurrency(item.deposit / 1000, { currencySymbol: CurrencySymbolEnum.K })}`,
        isActive: item.level === userRank.value,
      };
    });
  });

  const gameRateTableData = computed<IGameRateTableData>(() => {
    return {
      headers: [
        { title: "Thể loại" },
        { title: "Vip 5", icon: "vip/5.webp", level: 4 },
        { title: "Vip 4", icon: "vip/4.webp", level: 3 },
        { title: "Vip 3", icon: "vip/3.webp", level: 2 },
        { title: "Vip 2", icon: "vip/2.webp", level: 1 },
        { title: "Vip 1", icon: "vip/1.webp", level: 0 },
      ],
      rows: gameRefundRates.value.map((item) => {
        return { ...item, rates: [...item.rates].reverse() };
      }),
    };
  });

  return {
    gameRateTableData,
    levelItems,
    userRank,
    isLoading,
    isError,
  };
};
