export default defineNuxtRouteMiddleware((_to, _from) => {
  const { ssrContext } = useNuxtApp();

  if (ssrContext) {
    return;
  }

  const { menuAccountDeposit, maintenanceMethodMap } = useAccountMenuDeposit();

  // Each menu has a path, check if the current menu is under maintenance
  const idxMenu = menuAccountDeposit.value.findIndex((menu) => menu.path.includes(_to.path));

  if (idxMenu === -1) {
    return;
  }

  // Check if the current menu is under maintenance then redirect to the previous menu
  if (menuAccountDeposit.value[idxMenu].isUnderMaintenance) {
    abortNavigation();
    const idxRedirect = menuAccountDeposit.value.findIndex((menu) => !menu.isUnderMaintenance);
    return navigateTo(menuAccountDeposit.value?.[idxRedirect]?.path ?? "/");
  }

  // Maintenance check in each loading method
  const menuMaintain = maintenanceMethodMap.value[menuAccountDeposit.value[idxMenu].name as AccountDepositMethodEnum];
  const idxMenuMaintain = menuMaintain?.findIndex((maintainItem) => maintainItem.path.includes(_to.fullPath)) ?? -1;

  // Check if the current method is under maintenance then redirect to the previous method
  if (idxMenuMaintain >= 0 && menuMaintain?.[idxMenuMaintain]?.isUnderMaintenance) {
    abortNavigation();
    const idxRedirect = menuMaintain.findIndex((maintainItem) => !maintainItem.isUnderMaintenance);
    return navigateTo(menuMaintain?.[idxRedirect]?.path ?? "/");
  }
});
