export const useUserRank = () => {
  const nuxt = useNuxtApp();
  const appStore = useAppStore();
  const userRank = useState<IUserRankData["level"]>("user-rank");

  const {
    status,
    error,
    refresh: refreshUserRank,
  } = useAsyncData(
    "getUserRank",
    async () => {
      if (appStore.isLoggedIn && userRank.value === undefined) {
        userRank.value = await nuxt.$userService.getUserRank();
      }

      return {};
    },
    {
      server: false,
    },
  );

  return {
    userRank,
    status,
    error,
    refreshUserRank,
  };
};
