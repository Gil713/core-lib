export const useNotification = () => {
  const { $systemService } = useNuxtApp();

  const isFetchNotificationProcessing = ref<boolean>(false);
  const fetchNotiError = ref<INuxtCustomError | undefined>();
  const notiList = ref<IUserNoti[]>([]);
  const notiOddTypeList = ref<IUserNoti[]>([]);
  const notiNotifyTypeList = ref<IUserNoti[]>([]);

  const idReadCookie = useCookie<number[]>("idRead", { default: () => [] }); //need to verify logic

  const getUserNotifications = async () => {
    isFetchNotificationProcessing.value = true;
    try {
      const notiListRes = await $systemService.getNotification();

      // sort notiList
      notiListRes.sort((item, nextItem) => {
        const isItemRead = idReadCookie.value.includes(item.id);
        const isNextItemRead = idReadCookie.value.includes(nextItem.id);

        return isItemRead && !isNextItemRead ? 1 : !isItemRead && isNextItemRead ? -1 : 0;
      });

      notiList.value = notiListRes;
      notiList.value.forEach((noti: IUserNoti) => {
        if (noti.type === UserNotiTypeEnum.ODD && noti?.teams) {
          notiOddTypeList.value.push(noti);
        } else if (noti.type === UserNotiTypeEnum.NOTIFY) {
          notiNotifyTypeList.value.push(noti);
        }
      });
    } catch (error) {
      fetchNotiError.value = error as INuxtCustomError;
      notiList.value = [];
    } finally {
      isFetchNotificationProcessing.value = false;
    }
  };

  return {
    getUserNotifications,
  };
};
