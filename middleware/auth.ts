export default defineNuxtRouteMiddleware((_to, _from) => {
  const appStore = useAppStore();

  // is not Logged in
  if (!appStore.currentUser) {
    abortNavigation();
    return navigateTo("/");
  }
});
