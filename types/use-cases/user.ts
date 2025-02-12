// use for deposit, withdraw,...
export type IMappedSystemPhoneCardPaymentWImg = {
  systemPhoneCardProviderName: SystemPhoneCardPaymentNameEnum;
  img: string;
  systemPhoneCardPaymentInfo: ISystemPhoneCardPaymentInfo;
};

export type IMappedUserBank = ISystemUserBankPaymentMethod & {
  display: string;
};
