type IUseGameAliases = {
  fetchOptions: { type: GameTypeEnum };
};

export const useGameAliases = (fetchOptions: IUseGameAliases["fetchOptions"]) => {
  const { $gameService } = useNuxtApp();

  const route = useRoute();
  const aliases = useState<IGameAlias[]>(`${fetchOptions.type}-aliases`);
  const error = useState<INuxtCustomError | undefined>(`${fetchOptions.type}-aliases-error`);

  const currentAlias = computed<IGameAlias | undefined>(() => {
    const matchedAlias = aliases.value?.find((a) => {
      return a.alias === route.params.type;
    });

    if (matchedAlias) return matchedAlias;
    return aliases.value?.find((a) => a.alias === GameAliasEnum.ALL);
  });

  const currentBannerSrc = computed(() => {
    return currentAlias.value?.banner || "default-alias-banner.webp";
  });

  const fetch = async () => {
    try {
      if (!aliases.value) aliases.value = await $gameService.getAliases({ type: fetchOptions.type });
      return aliases.value;
    } catch (e: unknown) {
      error.value = e as INuxtCustomError;
    }
  };

  return { fetch, aliases, error, currentAlias, currentBannerSrc };
};
