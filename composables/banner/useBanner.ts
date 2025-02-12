export const useBanner = () => {
  const store = useAppStore();
  const { $systemService } = useNuxtApp();

  const { data: bannerList, error } = useApi("banner", async () => {
    return await $systemService.getHeroBanners();
  });

  if (error) {
    //TODO: handle getHeroBanners error lewis
  }

  const handleClick = (props: { banner?: IBanner; openLoginDialogFn: () => void }) => {
    const { banner, openLoginDialogFn } = props;
    if (!banner?.api_url) return;

    const apiUrl = banner.api_url;

    if (apiUrl.includes("partnerprovider") && apiUrl.includes("partnergameid")) {
      openInNewTab(apiUrl);
      return;
    }

    if (apiUrl.includes("account")) {
      if (!store.isLoggedIn) {
        openLoginDialogFn();
        return;
      }
      navigateTo(apiUrl);
      return;
    }

    navigateTo(apiUrl);
  };
  return {
    bannerList,
    error,
    handleClick,
  };
};
