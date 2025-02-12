import dayjs from "dayjs";

type IUsePromotion = {
  rewardPeriods?: IRewardPeriod[];
};

type IColumnsOfTableBonus = {
  title: string;
  key: string;
  class?: string;
  isShow: boolean;
};

const MIN_RANDOM_AVATAR = 1;
const MAX_RANDOM_AVATAR = 15;

export const usePromotionStatistic = (options?: IUsePromotion) => {
  const { $systemService } = useNuxtApp();

  const currentRoute = useRoute();
  const { isMobileOrTablet } = useDevice();

  const columnsOfTableBonus = computed<IColumnsOfTableBonus[]>(() => [
    {
      title: "Thứ tự",
      key: "order",
      isShow: true,
    },
    {
      title: "Người chơi",
      key: "username",
      isShow: true,
    },
    {
      title: "Trận đấu",
      key: "match",
      isShow: !isMobileOrTablet,
    },
    {
      title: isMobileOrTablet ? "Thưởng (VND)" : "Tiền thưởng",
      key: "amount",
      isShow: true,
    },
  ]);

  const formatTimePeriod = (time: string | Date) => {
    return dayjs(time).format(SHORT_DATE_FORMAT);
  };

  const rewardPeriodsByPromotion = computed(() => {
    return (
      options?.rewardPeriods?.map((period) => ({
        ...period,
        label:
          period.type !== EventDetailScheduleBonusEnum.DAILY
            ? `${formatTimePeriod(period.start_time)} - ${formatTimePeriod(period.end_time)}`
            : formatTimePeriod(period.start_time),
      })) ?? []
    );
  });

  const selectedPeriod = ref<string | undefined>(rewardPeriodsByPromotion.value?.[0]?.id);

  const { data: promotionStatistic, status } = useAsyncData(
    currentRoute.fullPath + "statistic",
    () =>
      $systemService.getPromotionStatistic({
        alias: currentRoute.params.slug as string,
        period_id: selectedPeriod.value,
      }),
    {
      lazy: true,
      transform(data) {
        return data.map((item) => {
          const match = item.home_name && item.away_name ? item.home_name + " vs " + item.away_name : "Kèo kết hợp";
          return {
            ...item,
            avatar: `avatar/avatar-${Math.floor(Math.random() * (MAX_RANDOM_AVATAR - MIN_RANDOM_AVATAR + 1)) + MIN_RANDOM_AVATAR}.webp`,
            match,
            amount: formatVNDCurrency(Math.round(Number(item.amount))),
          };
        });
      },
      server: false,
      watch: [selectedPeriod],
    },
  );

  const isLoading = computed(() => status.value === "pending");

  return {
    promotionStatistic,
    isLoading,
    columnsOfTableBonus,
    selectedPeriod,
    formatTimePeriod,
    rewardPeriodsByPromotion,
  };
};
