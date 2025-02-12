export const useAppStore = defineStore("userStore", () => {
  const currentUser = ref<IUserInfo | undefined>(undefined);

  const systemPlan = ref<ISystemPlan | undefined>(undefined);
  const systemDepositPayment = ref<ISystemDepositPayment>();
  const systemPhoneCardPayment = ref<ISystemPhoneCardPayment | undefined>(undefined);

  const isLoggedIn = computed<boolean>(() => !!currentUser.value);
  const isChangeDisplayNameRequired = computed<boolean>(
    () => isLoggedIn.value && currentUser.value?.username === currentUser.value?.fullname,
  );

  const mappedUserBankList = computed<IMappedUserBank[] | undefined>(() => {
    return systemDepositPayment.value?.userBanks.map((item: ISystemUserBankPaymentMethod) => {
      return {
        ...item,
        display: item.bank_account_name_mask + " - " + item.bank_account_no_mask,
      };
    });
  });

  const isUserBankAvailable = computed(() => {
    if (!mappedUserBankList.value) {
      return false;
    }

    return mappedUserBankList.value.length > 0;
  });

  const mappedPackages = computed<Partial<ISystemDepositPackage & { percent: string }>[] | undefined>(() => {
    const sortedList = systemDepositPayment.value?.packages.sort((a, b) => a.id - b.id);

    return sortedList?.map((item) => {
      const matches = item.name.match(/(\d+(\.\d+)?)%/);
      return {
        ...item,
        description: item?.description,
        percent: matches?.length ? matches[0] : item.name,
      };
    });
  });

  const isCommissionPackage = computed(() => {
    return systemPlan.value?.package_id === PackageEnum.HOAN_TRA && systemDepositPayment.value?.packages.length === 1;
  });

  const hasJoinPromotion = computed(() => {
    if (!systemPlan.value) {
      return;
    }

    const blockedPackageDeposit = [PackageEnum.THUONG_300, PackageEnum.THUONG_150_1, PackageEnum.THUONG_100_2];

    return systemPlan.value.rolling > 0 && blockedPackageDeposit.includes(systemPlan.value?.package_id);
  });

  const amountRolling = computed(() => {
    return Math.abs((systemPlan.value?.rolling ?? 0) - (systemPlan.value?.turnover ?? 0));
  });

  return {
    isChangeDisplayNameRequired,
    currentUser,
    isLoggedIn,
    mappedUserBankList,
    isUserBankAvailable,
    mappedPackages,
    isCommissionPackage,
    hasJoinPromotion,
    amountRolling,
    systemPlan,
    systemDepositPayment,
    systemPhoneCardPayment,
  };
});

setupPiniaHMR(useAppStore);
