export const useStaticPageTab = () => {
  const { $staticPageService } = useNuxtApp();

  const currentMainTab = computed<IStaticPageMainTab | undefined>(() =>
    staticPageTabs.find((tab) => useRoute().path.includes(tab.value)),
  );

  const currentCategoryBySlug = computed<IStaticNewsCategory | undefined>(() => {
    return categories.value?.find((category) => category.alias === useRoute().params.alias) || categories.value?.[0];
  });

  const commonCategoryTabsExcludeCurrentRoute = computed<ICommonTab[]>(() => {
    return convertCategoriesToCommonTabs(categories.value ?? []).filter((tab) => tab.value !== useRoute().params.alias);
  });

  const commonCategoryTabs = computed<ICommonTab[]>(() => {
    return convertCategoriesToCommonTabs(categories.value ?? []);
  });

  const createStaticPagePath = (alias?: string) => `${currentMainTab.value?.url}/${alias ?? ""}`;

  const convertCategoriesToCommonTabs = (categories: IStaticNewsCategory[]): ICommonTab[] => {
    return categories.map((category) => ({
      name: category.display_name,
      url: createStaticPagePath(category.alias),
      value: category.alias,
      icon: category.icon,
    }));
  };

  const {
    data: categories,
    status,
    error,
  } = useAsyncData<IStaticNewsCategory[]>("static-page-category", async () => {
    return $staticPageService.getCategoryByAlias(currentMainTab.value?.value ?? "");
  });

  watchEffect(() => {
    if (status.value === "success" && categories.value?.length && !useRoute().params.alias) {
      navigateTo(createStaticPagePath(categories.value?.[0]?.alias), { replace: true });
    }
  });

  watch(error, () => {
    // TODO: handle error here
  });

  return {
    categories,
    currentCategoryBySlug,
    currentMainTab,
    commonCategoryTabsExcludeCurrentRoute,
    commonCategoryTabs,
  };
};
