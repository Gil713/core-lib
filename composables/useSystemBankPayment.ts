export const useSystemBankPayment = () => {
  const nuxt = useNuxtApp();

  return useApi("getSystemBankPayment", async () => {
    return await nuxt.$systemService.getSystemBankPayment();
  });
};
