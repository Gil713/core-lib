export default defineNuxtRouteMiddleware((_to) => {
  const { $device } = useNuxtApp();

  if (_to.meta?.layout) {
    setPageLayout(_to.meta.layout);
    return;
  }

  const fullLayoutBaseUrls = [
    MobileBaseUrlEnum.VERIFY_EMAIL,
    BaseUrlEnum.ACCOUNT,
    BaseUrlEnum.INTRODUCTION,
    BaseUrlEnum.GUIDE,
    BaseRouteNameEnum.NEWS_ALIAS,
    APP_PATH.MATCH_SCHEDULE,
  ];
  const isFullLayout = fullLayoutBaseUrls.some(
    (url) => _to.name?.toString()?.startsWith(url) || _to.name?.toString() === url || _to.path === url,
  );

  if (isFullLayout && $device.isMobileOrTablet) {
    setPageLayout("full-mobile");
    return;
  }

  const layout = $device.isMobileOrTablet ? "mobile" : "desktop";
  setPageLayout(layout);
});
