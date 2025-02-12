export const usePromotions = () => {
  const { $systemService } = useNuxtApp();

  const {
    data: promotionEvents,
    status,
    error,
  } = useApi(
    useRoute().fullPath + "events",
    () =>
      $systemService.getPromotions({
        alias: useRoute().params.slug as string,
      }),
    { lazy: true },
  );

  return {
    promotionEvents,
    error,
    status,
  };
};
