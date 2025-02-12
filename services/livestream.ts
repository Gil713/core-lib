import type { $Fetch } from "nitropack";

export const LiveStreamService = (fetchFn: $Fetch): ILiveStreamService => ({
  verifyLiveStreamToken: async (groupId: string, streamId: string) => {
    const response: ILivestreamResponse = await fetchFn(getGameEndpoints().getLiveStream(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId: groupId,
        streamId: streamId,
        site: window.location.host,
      }),
    });

    return response;
  },
});
