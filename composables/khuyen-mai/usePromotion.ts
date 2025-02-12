export const usePromotion = () => {
  const { $systemService } = useNuxtApp();

  const {
    data: events,
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
    events,
    error,
    status,
  };
};
