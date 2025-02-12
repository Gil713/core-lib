export enum VerifyEmailInfoStatusEnum {
  SUCCESS = "success",
  FAILED = "failed",
}

type IVerifyEmailInfo = {
  description: string;
  icon: string;
  status: VerifyEmailInfoStatusEnum;
};

export const useVerifyEmail = () => {
  const { $userService } = useNuxtApp();

  const { refreshUserInfo } = useRefresh();
  const route = useRoute();

  const verifyInfo = ref<IVerifyEmailInfo | undefined>(undefined);

  const verifyEmailByToken = async (token: string): Promise<void> => {
    try {
      const rs = await $userService.verifyEmailByToken({ token });

      if (!rs) {
        verifyInfo.value = {
          description: "Xác thực email thất bại",
          icon: "verify-email-failed.webp",
          status: VerifyEmailInfoStatusEnum.FAILED,
        };
        return;
      }

      verifyInfo.value = {
        description: "Xác thực email thành công",
        icon: "verify-email-done.webp",
        status: VerifyEmailInfoStatusEnum.SUCCESS,
      };
      refreshUserInfo();
    } catch (error: unknown) {
      const statusCode = (error as INuxtCustomError).statusCode;
      const statusMessage = (error as INuxtCustomError).statusMessage;

      verifyInfo.value = {
        description: statusCode === 400 ? "Hết hạn xác thực" : statusMessage,
        icon: statusCode === 400 ? "verify-email-expired.webp" : "verify-email-failed.webp",
        status: VerifyEmailInfoStatusEnum.FAILED,
      };
    }
  };

  onMounted(async () => {
    if (route.query.token) {
      await verifyEmailByToken(route.query.token as string);
    }
  });

  return { verifyEmailByToken, verifyInfo };
};
