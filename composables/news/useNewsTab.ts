export const useNewsTab = () => {
  const { categories, status, error } = useCategoriesByAlias({ alias: CategoryAliasEnum.TIN_TUC });

  const currentCategoryBySlug = computed<IStaticNewsCategory | undefined>(() => {
    return categories.value?.find((category) => category.alias === useRoute().params.slug) || categories.value?.[0];
  });

  const newsCategoryTabs = computed<ICommonTab[]>(() => {
    return convertCategoriesToCommonTabs(categories.value ?? []);
  });

  const convertCategoriesToCommonTabs = (categories: IStaticNewsCategory[]): ICommonTab[] => {
    return categories.map((category) => ({
      name: category.display_name,
      url: category.alias === NewsCategoryAliasEnum.ALL ? APP_PATH.NEWS : `${APP_PATH.NEWS_CATEGORY}/${category.alias}`,
      value: category.alias,
      icon: category.icon,
    }));
  };

  return {
    categories,
    status,
    error,
    currentCategoryBySlug,
    newsCategoryTabs,
  };
};
