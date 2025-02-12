import dayjs from "dayjs";

// TODO move to composable
const statusField = createBonusFieldBuilder()
  .buildTitle("Trạng thái")
  .buildDescription("Đang tham gia")
  .buildDesClass(BonusClassEnum.STATUS)
  .build() as IBonusInfo;

export const createStatisticData = (
  yesterdayCommission: number,
  summary?: ISummaryBonus,
  plan?: ISystemPlan,
): IBonusStatisticItem[] => {
  const rolling = plan?.rolling || 0;
  const turnover = plan?.turnover || 0;
  const todayCommissionDesHtml = `Tính từ <span class='text-primary'>00:00 - 23:59</span>${useDevice().isMobile ? "" : " trong ngày"}`;
  return [
    {
      title: "Tổng thưởng đã nhận",
      icon: "account/bonus/promotion.webp",
      amount: Math.round(summary?.promotion || 0),
    },
    {
      title: "Tổng tiền hoàn trả",
      icon: "account/bonus/commission.webp",
      descriptionHtml: "(30 ngày)",
      amount: Math.round(summary?.commission || 0),
    },
    {
      title: "Hoàn trả hôm qua",
      icon: "account/bonus/today-commission.webp",
      descriptionHtml: todayCommissionDesHtml,
      amount: Math.round(yesterdayCommission),
    },
    {
      title: "Tiền cược yêu cầu",
      icon: "account/bonus/rolling.webp",
      descriptionHtml: "Cần hoàn thành trước khi rút",
      actionTitle: "Hủy",
      amount: Math.round(rolling - turnover),
    },
  ];
};

export const commissionPromotion = (gamesRefundRates: IGameRate[], level: number): IBonusItem => {
  const levelLabel = `VIP${level + 1}`;
  const rateDetails = gamesRefundRates?.map((item) => ({
    title: item.label,
    description: `${item.rates?.[level] ?? 0}%`,
  }));
  const isDesktop = useDevice().isDesktop;
  const bonusRateField = createBonusFieldBuilder()
    .buildTitle("Tỉ lệ thưởng")
    .buildDescription(levelLabel)
    .buildDesClass(BonusClassEnum.HIGHLIGHT)
    .build() as IBonusInfo;

  const promotionNameField = createBonusFieldBuilder()
    .buildTitle("Chương trình khuyến mãi")
    .buildDescription("HOÀN TRẢ VÔ TẬN")
    .build() as IBonusInfo;

  return {
    overviews: [...(isDesktop ? [promotionNameField] : []), statusField, bonusRateField],
    details: rateDetails,
  };
};

export const otherPromotion = (plan?: ISystemPlan): IBonusItem => {
  const isDesktop = useDevice().isDesktop;
  const bonusRateField = createBonusFieldBuilder()
    .buildTitle("Tiền thưởng")
    .buildDescription(`${formatVNDCurrency(plan?.promotion_amount)}`)
    .buildDesClass(BonusClassEnum.HIGHLIGHT)
    .build() as IBonusInfo;

  const promotionNameField = createBonusFieldBuilder()
    .buildTitle("Chương trình khuyến mãi")
    .buildDescription(plan?.name.toUpperCase() || "")
    .buildDesClass(BonusClassEnum.UPPERCASE)
    .build() as IBonusInfo;

  return {
    overviews: [...(isDesktop ? [promotionNameField] : []), statusField, bonusRateField],
    details: [
      {
        title: "Tổng cược yêu cầu",
        description: `${formatVNDCurrency(plan?.rolling)}`,
      },
      {
        title: "Tiền cược hiện tại",
        description: `${formatVNDCurrency(plan?.turnover)}`,
      },
      {
        title: "Vòng cược",
        description: `${plan?.multiplier || 0} vòng`,
      },
      {
        title: "Thời gian tham gia",
        description: dayjs(plan?.created_time).format(BONUS_DATE_FORMAT),
      },
      {
        title: isDesktop ? "Thời gian hoàn thành khyến mãi" : "Thời gian hoàn thành KM",
        description: dayjs(plan?.created_time).add(30, "days").format(BONUS_DATE_FORMAT),
      },
    ],
  };
};
