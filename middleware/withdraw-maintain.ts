export default defineNuxtRouteMiddleware((_to, _from) => {
  const { ssrContext } = useNuxtApp();

  if (ssrContext) {
    return;
  }

  const { menuAccountWithdraw } = useAccountMenuWithdraw();

  // Each menu has a path, check if the current menu is under maintenance
  const idxMenu = menuAccountWithdraw.value.findIndex((menu) => menu.path.includes(_to.path));

  if (idxMenu === -1) {
    return;
  }

  // Check if the current menu is under maintenance then redirect to the nearest non-maintenance menu
  if (menuAccountWithdraw.value[idxMenu].isUnderMaintenance) {
    abortNavigation();
    const idxRedirect = menuAccountWithdraw.value.findIndex((menu) => !menu.isUnderMaintenance);
    return navigateTo(menuAccountWithdraw.value?.[idxRedirect]?.path ?? APP_PATH.HOME);
  }
});
