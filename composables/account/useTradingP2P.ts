export const useTradingP2P = () => {
  const appStore = useAppStore();
  const { currentUser } = storeToRefs(appStore);
  const isLoading = ref(true);

  const IFRAME_STYLE = ISystemIframeThemes.DARK_STYLE;
  const BANK_EMPTY_CONFIG = {
    button: "Xác thực tài khoản.",
    url: `${useNuxtApp().$domainUrl}/account/bank`,
    content: "Bạn cần xác thực tài khoản ngân hàng chính chủ để bắt đầu giao dịp.",
  };

  // Computed property for iframe src
  const srcIframe = computed(() =>
    currentUser.value
      ? `https://ifr-cafe.com/buy?style=${IFRAME_STYLE}&id=${currentUser.value.tp_token}&button_bank_empty=${BANK_EMPTY_CONFIG.button}&url_bank_empty=${BANK_EMPTY_CONFIG.url}&content_bank_empty=${BANK_EMPTY_CONFIG.content}`
      : "",
  );
  return {
    srcIframe,
    isLoading,
  };
};
