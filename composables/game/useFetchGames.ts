const DEFAULT_LIMIT = 30;

export const useFetchGames = (
  fetchOptions: {
    type: GameTypeEnum;
    alias?: GameAliasEnum;
    limit?: number;
    sortBy?: GameSortByEnum;
    provider?: string;
  },
  config?: { key?: string },
) => {
  const route = useRoute();
  const { $gameService } = useNuxtApp();
  // keyGenerator("games") => "useFetchGames-games"
  const key =
    config?.key ||
    `${fetchOptions.type}-${fetchOptions.alias || ""}-${fetchOptions.sortBy || ""}-${fetchOptions.provider || ""}-games`;
  const keyGenerator = uniqueKeyGenerator(key);

  const stateKeys = {
    games: keyGenerator("games"),
    alias: keyGenerator("alias"),
    sortBy: keyGenerator("sortBy"),
    page: keyGenerator("page"),
    error: keyGenerator("error"),
    totalItems: keyGenerator("totalItems"),
    totalPages: keyGenerator("totalPages"),
    provider: keyGenerator("provider"),
  };

  const games = useState<IGame[] | undefined>(stateKeys.games);
  const alias = useState<GameAliasEnum | undefined>(stateKeys.alias, () => fetchOptions?.alias);
  const page = useState<number>(stateKeys.page, () => 1);
  const error = useState<INuxtCustomError | undefined>(stateKeys.error, () => undefined);
  const totalItems = useState<number>(stateKeys.totalItems, () => 0);
  const totalPages = useState<number>(stateKeys.totalPages, () => 0);
  const provider = useState<string | undefined>(stateKeys.provider, () => fetchOptions.provider);
  const sortBy = useState<GameSortByEnum | undefined>(stateKeys.sortBy, () => fetchOptions?.sortBy);
  const isFetchingGames = ref<boolean>(false);
  const isFetchingMoreGames = ref<boolean>(false);
  const gameType = fetchOptions.type;
  const limit = fetchOptions?.limit || DEFAULT_LIMIT;
  const canLoadMore = computed(() => {
    return (
      !isFetchingGames.value && !isFetchingMoreGames.value && !!games.value?.length && page.value < totalPages.value
    );
  });

  const fetch = async () => {
    try {
      page.value = 1;
      isFetchingGames.value = true;
      error.value = undefined;

      const gamesResponse = await $gameService.getGames({
        type: gameType,
        alias: alias.value,
        sortBy: sortBy.value || undefined,
        provider: provider.value,
        page: page.value,
        limit,
      });

      games.value = gamesResponse.items;
      totalItems.value = gamesResponse.total;
      totalPages.value = gamesResponse.total_page;
      return gamesResponse;
    } catch (e: unknown) {
      error.value = e as INuxtCustomError;
    } finally {
      isFetchingGames.value = false;
    }
  };

  const fetchMore = async () => {
    if (!games.value) return;
    console.log("fetchMore");
    // This function could be called before fetch api returns the response => have to check games.length
    if (!canLoadMore.value) return;

    try {
      page.value++;
      isFetchingMoreGames.value = true;
      error.value = undefined;

      const gamesResponse = await $gameService.getGames({
        type: gameType,
        provider: provider.value,
        alias: alias.value!,
        sortBy: sortBy.value || undefined,
        page: page.value,
        limit,
      });

      games.value.push(...gamesResponse.items);
    } catch (e: unknown) {
      error.value = e as INuxtCustomError;
    } finally {
      isFetchingMoreGames.value = false;
    }
  };

  onUnmounted(() => {
    clearNuxtState(Object.values(stateKeys));
  });

  watch(
    () => [route.query.provider, route.query.sort],
    async ([newProviderQuery, newSortByQuery], [oldProviderQuery, oldSortByQuery]) => {
      let hasChanged = false;
      if (newProviderQuery !== oldProviderQuery) {
        hasChanged = true;
        provider.value = newProviderQuery as string;
      }
      if (newSortByQuery !== oldSortByQuery) {
        hasChanged = true;
        sortBy.value = gameSortOptions.find((el) => el.queryUrl === newSortByQuery)?.value;
      }

      if (hasChanged) {
        await fetch();
      }
    },
  );

  return {
    games,
    page,
    limit,
    isFetchingGames,
    isFetchingMoreGames,
    totalItems,
    totalPages,
    canLoadMore,
    key,
    fetch,
    fetchMore,
  };
};
