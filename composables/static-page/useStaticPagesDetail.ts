export const useStaticPageDetail = () => {
  const { $staticPageService } = useNuxtApp();
  const { error, data: staticPageDetail } = useAsyncData("get-static-page-detail", async () => {
    const alias = useRoute().params.alias as string;
    return $staticPageService.getDetailByAlias(alias);
  });

  watch(error, () => {
    // TODO: handle error here
  });

  return {
    staticPageDetail,
  };
};
