export type ILivestreamToken = {
  token: string;
};
export type ILivestreamResponse = {
  data: ILivestreamToken;
};
export type ILiveStreamService = {
  verifyLiveStreamToken: (groupId: string, streamId: string) => Promise<ILivestreamResponse>;
};
