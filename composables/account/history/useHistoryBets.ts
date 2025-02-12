import dayjs from "dayjs";
const listSelectCategory = [
  {
    id: 1,
    value: "all_category",
    text: "Tất cả",
  },
  {
    id: 2,
    value: "sport",
    text: "Thể thao",
  },
  {
    id: 3,
    value: "other_sport",
    text: "Games khác",
  },
];

let listSelectStatus = [
  {
    id: 1,
    value: "all_status",
    text: "Tất cả",
  },
  {
    id: 2,
    text: "Thắng",
    value: "Win",
  },
  {
    id: 3,
    text: "Thắng 1/2",
    value: "Half-Win",
    isSport: true,
  },
  {
    id: 4,
    text: "Thua",
    value: "Lose",
  },
  {
    id: 5,
    text: "Thua 1/2",
    value: "Half-Lose",
    isSport: true,
  },
  {
    id: 6,
    text: "Đang xử lý",
    value: "Running",
  },
  {
    id: 7,
    text: "Hòa",
    value: "Draw",
  },
  {
    id: 8,
    text: "Hoàn Tiền",
    value: "Refund",
  },
  {
    id: 9,
    text: "Huỷ kèo",
    value: "Cancel",
  },
];
export const useHistoryBets = () => {
  const { $betsHistoryService } = useNuxtApp();
  const $device = useDevice();
  const dataHistoryBets = ref<IBetsHistory[]>([]);
  const showPerPage = 7;
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItem = ref(0);
  const { createToast } = useToast();
  const selectedHistoryItem = ref({
    category: "all_category",
    titleCategory: "",
    status: "all_status",
    titleStatus: "",
  });

  const payload: Record<string, string | number> = {
    status: "",
    game_type: "",
    page: currentPage.value,
    limit: showPerPage,
  };

  const handleSortSelectStatus = (selectedValue: string) => {
    if (selectedValue === listSelectCategory[2].value) {
      const data = listSelectStatus?.filter((item) => !item?.isSport);
      listSelectStatus = data;
    } else {
      listSelectStatus = [...listSelectStatus];
    }
    selectedHistoryItem.value.status = listSelectStatus[0].value;
    selectedHistoryItem.value.titleStatus = listSelectStatus[0].text;
  };

  const handleSelectCategory = (item: { id: number; value: string; text: string }) => {
    selectedHistoryItem.value.category = item.value;
    selectedHistoryItem.value.titleCategory = item.text;
    handleSortSelectStatus(item.value);
  };

  const handleSelectStatus = (item: { id: number; value: string; text: string }) => {
    selectedHistoryItem.value.status = item.value;
    selectedHistoryItem.value.titleStatus = item.text;
  };

  watch(selectedHistoryItem.value, (value) => {
    payload.game_type = value.category !== listSelectCategory[0].value ? value.category : "";
    payload.status = value.status !== listSelectStatus[0].value ? value.status : "";
    payload.page = 1;
    currentPage.value = 1;
    fetchBetsHistory();
  });

  const getTypeIcon = (item: IBetsHistory) => {
    if (item.product === GameBets.SPORTBOOKS || item.product === GameBets.ESPORT || item.game_type === TypeGame.SPORT) {
      return `SvgoAccountHistorySport`;
    } else {
      return `SvgoAccountHistoryGame`;
    }
  };

  const getStatusClass = (status: string | undefined): ClassCustomBets => {
    const statusClassMap: { [key: string]: ClassCustomBets } = {
      [StatusBets.WIN]: ClassCustomBets.WIN,
      [StatusBets.WON]: ClassCustomBets.WIN,
      [StatusBets.LOSE]: ClassCustomBets.LOSE,
      [StatusBets.TIP]: ClassCustomBets.TIP,
      [StatusBets.CANCEL]: ClassCustomBets.CANCEL,
      [StatusBets.REJECT]: ClassCustomBets.REJECT,
      [StatusBets.RUNNING]: ClassCustomBets.RUNNING,
      [StatusBets.DRAW]: ClassCustomBets.DRAW,
      [StatusBets.HALF_WON]: ClassCustomBets.HALF_WON,
      [StatusBets.HALF_LOSE]: ClassCustomBets.HALF_LOSE,
      [StatusBets.REFUND]: ClassCustomBets.REFUND,
    };
    return statusClassMap[status?.toLowerCase() as keyof typeof statusClassMap] || ClassCustomBets.PROCESSING;
  };

  const getBettingStatus = (status: string | undefined): BetLabel => {
    const bettingStatusMap: { [key: string]: BetLabel } = {
      [StatusBets.WIN]: BetLabel.WIN,
      [StatusBets.WON]: BetLabel.WIN,
      [StatusBets.LOSE]: BetLabel.LOSE,
      [StatusBets.TIP]: BetLabel.TIP,
      [StatusBets.CANCEL]: BetLabel.CANCEL,
      [StatusBets.REJECT]: BetLabel.CANCEL,
      [StatusBets.RUNNING]: BetLabel.PROCESSING,
      [StatusBets.DRAW]: BetLabel.DRAW,
      [StatusBets.HALF_WON]: BetLabel.HALF_WON,
      [StatusBets.HALF_LOSE]: BetLabel.HALF_LOSE,
      [StatusBets.REFUND]: BetLabel.REFUND,
    };
    return bettingStatusMap[status?.toLowerCase() as keyof typeof bettingStatusMap] || BetLabel.PROCESSING;
  };

  const formatWinLoss = (value: number) => {
    return value > 0 ? "+" + formatAmountUnitEvent(String(value) || "") : formatAmountUnitEvent(String(value) || "");
  };

  const fetchBetsHistory = async () => {
    try {
      const { data, total } = await $betsHistoryService.getListBetsHistory(payload);
      totalPages.value = Math.ceil(total / showPerPage);
      totalItem.value = total;
      dataHistoryBets.value = data?.map((item: IBetsHistory) => {
        return {
          ...item,
          title: item?.product,
          amount:
            (formatAmountUnitEvent(String(item?.stake !== 0 ? item?.stake * 1000 : item?.game_stake)) || 0) + " VND",
          time:
            dayjs(item?.created_time).format(
              $device.isDesktop ? DATE_TIME_HISTORY_FORMAT : DATE_TIME_HISTORY_SHORT_FORMAT,
            ) || "",
          win_loss:
            item?.winlost && item?.ticket_status !== "NEW"
              ? (formatWinLoss(formatNumberToPrecision(item?.winlost) * 1000) || 0) + " VND"
              : "---",
          status: getBettingStatus(item?.ticket_status),
          icon: getTypeIcon(item),
          status_class: getStatusClass(item?.ticket_status),
        };
      });
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message || "Failed to fetch history bets",
      });
    }
  };

  const fetchMore = async () => {
    if (currentPage.value === totalPages.value) return;
    try {
      payload.page = currentPage.value += 1;
      currentPage.value += 1;
      const { data, total } = await $betsHistoryService.getListBetsHistory(payload);
      totalPages.value = Math.ceil(total / showPerPage);
      totalItem.value = total;
      const dataList = data?.map((item: IBetsHistory) => {
        return {
          ...item,
          title: item?.product,
          amount: (formatAmountUnitEvent(String(item?.stake * 1000)) || 0) + " VND",
          time:
            dayjs(item?.created_time).format(
              $device.isDesktop ? DATE_TIME_HISTORY_FORMAT : DATE_TIME_HISTORY_SHORT_FORMAT,
            ) || "",
          win_loss:
            item?.winlost && item?.ticket_status !== "NEW"
              ? (formatWinLoss(formatNumberToPrecision(item?.winlost) * 1000) || 0) + " VND"
              : "",
          status: getBettingStatus(item?.ticket_status),
          icon: getTypeIcon(item),
          status_class: getStatusClass(item?.ticket_status),
        };
      });
      const uniqueItemsToAdd = dataList.filter((item) => {
        return !dataHistoryBets.value.some((existingItem) => existingItem.id === item.id);
      });
      dataHistoryBets.value.push(...uniqueItemsToAdd);
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message || "Failed to fetch history bets",
      });
    }
  };

  const onCategoryPageChanged = (page: number) => {
    currentPage.value = page;
    payload.page = page;
    fetchBetsHistory();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { error, status } = useApi("getListBetsHistory", () => fetchBetsHistory(), {
    server: false,
  });

  return {
    fetchBetsHistory,
    dataHistoryBets,
    listSelectCategory,
    listSelectStatus,
    handleSelectCategory,
    selectedHistoryItem,
    handleSelectStatus,
    fetchMore,
    totalPages,
    currentPage,
    showPerPage,
    onCategoryPageChanged,
    totalItem,
    error,
    status,
  };
};
