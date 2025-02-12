type IUseCategoriesByAlias = {
  alias: CategoryAliasEnum;
};
export const useCategoriesByAlias = (options: IUseCategoriesByAlias) => {
  const { $staticPageService } = useNuxtApp();

  const {
    data: categories,
    status,
    error,
  } = useApi(
    `p:${useRoute().path}a:${options.alias}"getCategoryByAlias"`,
    () => $staticPageService.getCategoryByAlias(options.alias),
    {
      lazy: true,
    },
  );

  return {
    status,
    error,
    categories,
  };
};
