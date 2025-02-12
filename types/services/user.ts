export type IVerifyExistEmailResponse = {
  exist: boolean;
};

export type IUserInfo = {
  aff_id: string | null;
  avatar: string;
  balance: number;
  bank_account_no: boolean;
  bank_code: boolean;
  bank_name: boolean;
  birthday: boolean;
  boping_id: boolean;
  code_pay: string;
  created_time: string;
  email: string;
  emailmask: string;
  fullname: string;
  id: number;
  is_share_facebook: boolean;
  is_verify_email: boolean;
  is_verify_phone: boolean;
  last_login: string;
  lucky_number: string;
  member_id: number;
  momo_code: string;
  package_id: number | boolean;
  phone: string;
  phonemask: string;
  plan_id: boolean;
  redirect_url?: string; // available when login with query ?back='loyalty-keno'
  register_ip: string;
  sale_advised: string;
  token: string;
  tp_token: string;
  type: "USER" | "TEST";
  username: string;
  username_new: string;
  uuid: string;
  viettel_code: string;
  bet_sportbook: boolean; // response from login & refresh danh cho tracking co yeu thich game the thao hay k
  favorite_game: string; // response from login & refresh danh cho event may man
};

export type IUserRankData = {
  last_level: number;
  level: number;
  username: string;
};

export enum UserNotiTypeEnum {
  ODD = "odd",
  NOTIFY = "notify",
}

export type IUserNoti = {
  id: number;
  title: string;
  description: string;
  type: UserNotiTypeEnum;
  category: string;
  url: string;
  // match_name: null;
  // text_time: null;
  // ksport_league_id: null;
  // athena_league_id: null;
  // ksport_match_id: null;
  // athena_match_id: null;
  created_at: string;
  teams: unknown; // need to be verify
};

export type IForgotPasswordBody = {
  email: string;
};

export type ILoginBody = {
  username: string;
  password: string;
  back?: string;
};

export type IRegisterBody = {
  username: string;
  password: string;
  phone: string;
  back?: string;
};

export type IResetPasswordBody = {
  password: string;
  confirmPassword: string;
  token?: string;
};

export type IUpdateInfoBody = {
  fullname?: string;
  email?: string;
};
export type IUpdateProfileInfoResponse = IApiResponseWithoutData & { user: Record<string, string> };

export type IUserService = {
  registerUser: (payload: IRegisterBody) => Promise<IApiResponse<IUserInfo[]>>;
  logIn: (payload: ILoginBody) => Promise<IApiResponse<IUserInfo[]>>;
  updateInfo: (payload: IUpdateInfoBody) => Promise<boolean>;
  logOut: () => Promise<IApiResponseWithoutData>;
  addUserBankInfo: (payload: Record<string, string>) => Promise<ISystemUserBankPaymentMethod>;
  getUserRank: () => Promise<IUserRankData["level"]>;
  updateProfileInfo: (payload: Record<string, string>) => Promise<string>;
  updatePassword: (payload: Record<string, string | undefined>) => Promise<string | undefined>;
  sendVerifyEmail: (params: { email: string }) => Promise<string | undefined>;
  verifyEmailByToken: (params: { token: string }) => Promise<boolean>;
  cancelPromotion: () => Promise<IApiResponseWithoutData>;
  forgotPassword: (payload: Record<string, string | undefined>) => Promise<IApiResponseWithoutData>;
  verifyExistEmail: (params: IForgotPasswordBody) => Promise<void>;
  resetPassword: (payload: IResetPasswordBody) => Promise<IApiResponseWithoutData>;
};
