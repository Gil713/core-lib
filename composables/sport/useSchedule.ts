import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";

type IUseSchedule = {
  key?: string;
  isClearedOnUnMounted?: boolean;
  leaguesDefault?: ILeague[];
};

const getDaysOfWeek = () => {
  const weekText = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  return Array.from({ length: 7 }, (_, key) => {
    const day = dayjs().add(key, "day");
    const shortDay = day.format("DD/MM");
    const longDay = day.format("YYYY-MM-DD");

    // Day of the week counted from current date
    // Change title of value 0: today, 1: tomorrow
    let title = weekText[day.day()];
    if (key === 0) title = "Hôm nay";
    else if (key === 1) title = "Ngày mai";

    return { title, shortDay, longDay };
  });
};

export const useSchedule = (options?: IUseSchedule) => {
  const { key = "useSchedule", isClearedOnUnMounted = true, leaguesDefault = [] } = options || {};
  const { $sportService } = useNuxtApp();
  const keyGenerator = uniqueKeyGenerator(key);
  const stateKeys = { schedule: keyGenerator("schedule"), leagues: keyGenerator("leagues") };

  const { createToast } = useToast();

  const days = computed<IDayItem[]>(() => getDaysOfWeek());
  const scheduleData = useState<IScheduleData>(stateKeys.schedule, () => ({}) as IScheduleData);
  const leagues = useState<ILeague[]>(stateKeys.leagues, () => leaguesDefault);

  const isLoading = ref<boolean>(false);
  const daySelected = ref<IDayItem>(days.value[0]);
  const leagueSelected = ref<ILeague>(leaguesDefault[0] as ILeague);

  const leagueIdsDefault = computed<string[]>(() => leaguesDefault.map((item) => item.id));

  const isLeagueListSet = computed<boolean>(() => leagueIdsDefault.value.includes(leagueSelected.value.id));

  const schedule = computed<IScheduleData>(() => {
    if (!isLeagueListSet.value && !scheduleData.value[leagueSelected.value.name]) {
      return {};
    }

    if (isLeagueListSet.value) {
      return scheduleData.value;
    }

    return { [leagueSelected.value.name]: scheduleData.value[leagueSelected.value.name] };
  });

  const onSelectDay = async (dayItem: IDayItem) => {
    daySelected.value = dayItem;
    leagueSelected.value = leaguesDefault[0];
    await fetchSchedule();
  };

  const onSelectLeague = async (league: ILeague) => {
    leagueSelected.value = league;
    if (leagueIdsDefault.value.includes(league.id)) {
      await fetchSchedule();
    }
  };

  const fetchSchedule = async () => {
    try {
      isLoading.value = true;

      const res = await $sportService.getSchedule({
        type: leagueSelected.value.id || "all",
        date: daySelected.value.longDay || days.value[0].longDay,
      });

      scheduleData.value = Object.keys(res).reduce((acc, key) => {
        if (res[key].length === 0) {
          return acc;
        }
        return { ...acc, [key]: res[key] };
      }, {});

      if (isLeagueListSet.value) {
        setLeagueList(res);
      }
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const setLeagueList = (data: IScheduleData): void => {
    leagues.value = (Object.keys(data) || []).reduce((acc, key) => {
      const league = data[key][0];
      if (isEmpty(league)) {
        return acc;
      }
      return [...acc, { id: league.league_id.toString(), name: league.league_name, logo: league.league_image }];
    }, leaguesDefault);
  };

  onUnmounted(() => {
    if (isClearedOnUnMounted) {
      clearNuxtState(Object.values(stateKeys));
    }
  });

  useAsyncData("fetchSchedule", async () => {
    await fetchSchedule();
    return {};
  });

  return {
    isLoading,
    schedule,
    days,
    daySelected,
    leagues,
    leagueSelected,
    onSelectDay,
    onSelectLeague,
    fetchSchedule,
  };
};
