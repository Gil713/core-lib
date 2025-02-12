type IUseSystemPhoneCardPayment = {
  viettelImg: string;
  mobifoneImg: string;
  vinaphoneImg: string;
  zingImg: string;
};
export const _useSystemPhoneCardPayment = (options: IUseSystemPhoneCardPayment) => () => {
  const { viettelImg, mobifoneImg, vinaphoneImg, zingImg } = options;

  const nuxt = useNuxtApp();

  const {
    data: mappedSystemPhoneCardPaymentWImg,
    status,
    error,
  } = useAsyncData(
    "getSystemCardPayment",
    async () => {
      return await nuxt.$systemService.getSystemCardPayment();
    },
    {
      transform(res): IMappedSystemPhoneCardPaymentWImg[] {
        return Object.entries(res).map(([systemPhoneCardProviderName, systemPhoneCardPaymentInfo]) => {
          const imgMap = {
            [SystemPhoneCardPaymentNameEnum.VIETTEL]: viettelImg,
            [SystemPhoneCardPaymentNameEnum.MOBIFONE]: mobifoneImg,
            [SystemPhoneCardPaymentNameEnum.VINAPHONE]: vinaphoneImg,
            [SystemPhoneCardPaymentNameEnum.ZING]: zingImg,
          };

          return {
            systemPhoneCardProviderName: systemPhoneCardProviderName as SystemPhoneCardPaymentNameEnum,
            img: imgMap[systemPhoneCardProviderName as SystemPhoneCardPaymentNameEnum],
            systemPhoneCardPaymentInfo,
          };
        });
      },
      getCachedData(key) {
        const data = nuxt.payload.data[key] || nuxt.static.data[key];
        if (!data) {
          return;
        }
        return data;
      },
      server: false,
    },
  );

  return {
    mappedSystemPhoneCardPaymentWImg,
    status,
    error,
  };
};
