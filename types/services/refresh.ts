import type { ResponseStatusEnum } from "./response";

export type IRefreshResponse = {
  code: number;
  status: ResponseStatusEnum;
  user: IUserInfo;
};
