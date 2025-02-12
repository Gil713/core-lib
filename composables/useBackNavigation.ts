export const useBackNavigation = () => {
  const router = useRouter();

  const handlePageBack = () => {
    const previousPage = router.options.history.state.back;
    if (previousPage) {
      return router.back();
    }
    return navigateTo(APP_PATH.HOME);
  };

  return { handlePageBack };
};
