export default function useAccountMenu() {
  const appStore = useAppStore();
  const { systemDepositPayment } = storeToRefs(appStore);
  const { mappedSystemPhoneCardPaymentWImg } = useSystemPhoneCardPayment();

  const depositBankMenus = computed(() => {
    return accountDepositBankMenus.map((accountDepositMethodMenuItem) => {
      const _banking =
        accountDepositMethodMenuItem.name === AccountDepositBankMethodEnum.CODE_PAY
          ? systemDepositPayment.value?.nicepayBanks
          : systemDepositPayment.value?.providerGoPay?.GOPAY?.bankings;
      return {
        ...accountDepositMethodMenuItem,
        isUnderMaintenance: !_banking?.length,
      };
    });
  });

  const eWalletMethods = computed(() => {
    return eWalletPaymentMethods.map((eWalletPaymentMethod) => {
      const _eWallet =
        eWalletPaymentMethod.type === EWalletPaymentMethodTypeEnum.MOMO
          ? systemDepositPayment.value?.momos
          : systemDepositPayment.value?.viettelPays;

      return {
        ...eWalletPaymentMethod,
        isUnderMaintenance: !_eWallet?.length,
        path: eWalletPaymentMethod.url,
      };
    });
  });

  const depositCardMenu = computed(() => {
    if (!mappedSystemPhoneCardPaymentWImg.value) {
      return undefined;
    }

    const isUnderMaintenance = !mappedSystemPhoneCardPaymentWImg.value?.some(
      (network: IMappedSystemPhoneCardPaymentWImg) =>
        network.systemPhoneCardPaymentInfo.status === SystemCardPaymentResponseStatus.USEABLE,
    );

    return [
      {
        name: AccountDepositMethodEnum.CARD,
        path: APP_PATH.DEPOSIT_CARD,
        isUnderMaintenance: isUnderMaintenance,
      },
    ];
  });

  const maintenanceMethodMap = computed(() => ({
    [AccountDepositMethodEnum.BANK]: depositBankMenus.value,
    [AccountDepositMethodEnum.E_WALLET]: eWalletMethods.value,
    [AccountDepositMethodEnum.CRYPTO]: undefined,
    [AccountDepositMethodEnum.CARD]: depositCardMenu.value,
  }));

  const menuAccountDeposit = computed(() => {
    return accountDepositMethodMenus.map((accountDepositMethodMenuItem) => {
      return {
        ...accountDepositMethodMenuItem,
        isUnderMaintenance:
          maintenanceMethodMap.value[accountDepositMethodMenuItem.name as AccountDepositMethodEnum]?.every(
            (methodItem) => methodItem.isUnderMaintenance,
          ) ?? false,
      };
    });
  });

  const menuAccountDepositMobile = computed(() => {
    return accountDepositMethodMenusMobile.map((menu) => {
      return {
        ...menu,
        isUnderMaintenance:
          [...menuAccountDeposit.value, ...depositBankMenus.value].find((item) => item.path === menu.path)
            ?.isUnderMaintenance ?? menu.isUnderMaintenance,
      };
    });
  });

  return { menuAccountDeposit, depositBankMenus, eWalletMethods, maintenanceMethodMap, menuAccountDepositMobile };
}
