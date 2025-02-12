export const useStaticAndNewsDetail = () => {
  const { $staticPageService } = useNuxtApp();

  const currentPostAlias = computed<string | undefined>(() => {
    const pathsExcludeAll = postDetail.value?.paths?.filter((path) => path !== NewsCategoryAliasEnum.ALL);
    return pathsExcludeAll?.[0];
  });

  const {
    data: postDetail,
    error,
    status,
  } = useApi(`p:${useRoute().params.alias}"get-detail-by-alias"`, async () => {
    const alias = useRoute().params.alias as string;
    return $staticPageService.getDetailByAlias(alias);
  });

  watch(postDetail, (postValue) => {
    if (postValue) {
      useBaseSeo({
        content_title: postValue.title,
        meta_title: postValue.title,
        meta_description: postValue.meta_description || postValue.description,
        meta_keyword: postValue.meta_keywords || postValue.description,
        alias: `${useNuxtApp().$domainUrl}${APP_PATH.NEWS}/${postValue.alias}`,
        seo_img: postValue.seo_img,
      });
    }
  });

  watch(error, () => {
    // TODO: handle error here
  });

  return {
    status,
    postDetail,
    currentPostAlias,
  };
};
