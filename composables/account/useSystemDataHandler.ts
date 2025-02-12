import _ from "lodash";

export const useSystemDataHandler = () => {
  const { $systemService } = useNuxtApp();

  const appStore = useAppStore();
  const { systemPlan, systemDepositPayment } = storeToRefs(appStore);

  const fetchDataOnDeposit = async () => {
    await Promise.allSettled([fetchAndUpdateSystemDepositPayment(), fetchAndUpdateSystemPlan()]);
  };

  const fetchAndUpdateSystemPlan = async () => {
    try {
      const data = await $systemService.getSystemPlan();
      systemPlan.value = data;
    } catch (error: unknown) {
      // TODO: toaster
      useLogError("useSystemDataHandler fetchAndUpdateSystemPlan", error as INuxtCustomError);
    }
  };

  const fetchAndUpdateSystemDepositPayment = async () => {
    try {
      systemDepositPayment.value = undefined;
      const res = await $systemService.getSystemDepositPayment();
      systemDepositPayment.value = _.merge(systemDepositPayment.value, res);
    } catch (error: unknown) {
      console.log("[useSystemDataHandler]::fetchAndUpdateSystemDepositPaymentInfo", error as INuxtCustomError);
    }
  };

  const initSystemData = async (): Promise<void> => {
    await Promise.allSettled([fetchAndUpdateSystemPlan(), fetchAndUpdateSystemDepositPayment()]);
  };

  return {
    initSystemData,
    fetchDataOnDeposit,
    fetchAndUpdateSystemPlan,
    fetchAndUpdateSystemDepositPayment,
  };
};
