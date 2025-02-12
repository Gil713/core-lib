export const usePlayGame = () => {
  const { $gameService } = useNuxtApp();

  const store = useAppStore();
  const route = useRoute();
  const { createToast } = useToast();
  const selectedGame = ref<IGame>();
  const isTrialPlay = ref<boolean>();

  const playGame = async (options: {
    game?: IGame;
    isTrial?: boolean;
    openLoginDialogFn: () => void;
    openBlockGameDialogFn: () => void;
    openAddDisplayNameDialogFn: () => void;
  }) => {
    try {
      console.log("store.isLoggedIn", store.isLoggedIn);
      console.log("store.isChangeDisplayNameRequired", store.isChangeDisplayNameRequired);
      if (!options?.game && !selectedGame) return;

      if (options.game) saveSelectedGame(options.game, options.isTrial);

      if (!store.isLoggedIn) {
        options.openLoginDialogFn();
        return false;
      }

      if (!validateGamePromotion()) {
        options.openBlockGameDialogFn();
        return false;
      }
      if (store.isChangeDisplayNameRequired) {
        options.openAddDisplayNameDialogFn();
        return false;
      }

      // Fetch game url
      const gamePlay = await getGamePlay();
      console.log("gamePlay", gamePlay);
      // Open game
      openInNewTab(gamePlay?.url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      createToast({
        variant: "destructive",
        description: "Không thể mở game",
      });
    }
  };

  const saveSelectedGame = (item: IGame, isTrial?: boolean): void => {
    isTrialPlay.value = isTrial;
    selectedGame.value = item;
  };

  const validateGamePromotion = (): boolean => {
    if (!store.currentUser || !selectedGame.value) return false;
    const isBlockedGame =
      Number(store.currentUser.package_id) > 1 &&
      selectedGame.value.deny_info &&
      selectedGame.value.deny_info === IGameDenyInfoEnum.WELCOME;

    return !isBlockedGame;
  };

  const getGamePlay = async (): Promise<IGamePlay | undefined> => {
    if (!selectedGame.value) return;

    return $gameService.getGamePlay({
      gameType: selectedGame.value.type,
      isTrial: isTrialPlay.value,
      partnerGameId: selectedGame.value.partner_game_id,
      partnerProvider: selectedGame.value.partner_provider,
      route: route.fullPath,
    });
  };

  return {
    playGame,
  };
};
