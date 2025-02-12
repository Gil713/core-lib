export enum SidebarMenuEnum {
  ACCOUNT_OVERVIEW = "ACCOUNT_OVERVIEW",
  ACCOUNT_DEPOSIT = "ACCOUNT_DEPOSIT",
  ACCOUNT_WITHDRAW = "ACCOUNT_WITHDRAW",
}

export const useSidebarMenu = createSharedComposable(() => {
  const currentSidebarMenu = ref<SidebarMenuEnum | undefined>(undefined);

  const openSidebarMenu = (sidebar: SidebarMenuEnum) => {
    currentSidebarMenu.value = sidebar;
  };

  const closeSidebarMenu = () => {
    currentSidebarMenu.value = undefined;
  };

  const handleNavigation = (url: string) => {
    closeSidebarMenu();
    navigateTo(url);
  };
  return {
    currentSidebarMenu,
    openSidebarMenu,
    closeSidebarMenu,
    handleNavigation,
  };
});
