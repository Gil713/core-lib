export default function useAccountMenuWithdraw() {
  const store = useAppStore();
  const { systemDepositPayment } = storeToRefs(store);
  const { mappedSystemPhoneCardPaymentWImg } = useSystemPhoneCardPayment();

  const isWithdrawCryptoUnderMaintenance = computed(() => {
    if (!systemDepositPayment.value?.crypto_v2 || !systemDepositPayment.value?.crypto_v2.length) {
      return true;
    }

    return !systemDepositPayment.value?.crypto_v2.some((item: ICryptoV2SysDepositPaymentMethod) => {
      return item.is_support_withdraw;
    });
  });

  const isWithdrawCardUnderMaintenance = computed(() => {
    if (!mappedSystemPhoneCardPaymentWImg.value) {
      return false;
    }

    return !mappedSystemPhoneCardPaymentWImg.value?.some(
      (network: IMappedSystemPhoneCardPaymentWImg) =>
        network.systemPhoneCardPaymentInfo.status === SystemCardPaymentResponseStatus.USEABLE,
    );
  });

  const maintenanceStatusMap = computed(() => {
    return {
      [APP_PATH.WITHDRAW_CRYPTO]: isWithdrawCryptoUnderMaintenance.value,
      [APP_PATH.WITHDRAW_CARD]: isWithdrawCardUnderMaintenance.value,
    };
  });

  const menuAccountWithdraw = computed(() => {
    return accountWithdrawMethodMenus.map((menuItem) => ({
      ...menuItem,
      isUnderMaintenance: maintenanceStatusMap.value[menuItem.path] || false,
    }));
  });

  const menuAccountWithdrawMobile = computed(() => {
    return accountWithdrawMethodMenusMobile.map((menuItem) => ({
      ...menuItem,
      isUnderMaintenance: maintenanceStatusMap.value[menuItem.path] || false,
    }));
  });

  return {
    menuAccountWithdraw,
    menuAccountWithdrawMobile,
  };
}
