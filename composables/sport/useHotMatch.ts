export const useHotMatch = () => {
  const { createToast } = useToast();
  const { $sportService } = useNuxtApp();
  const hotMatchList = useState<IMatchDetailData[]>("hot-match-list");

  const fetch = async () => {
    try {
      if (hotMatchList.value) return hotMatchList.value;

      const res = await $sportService.getHotMatch({ limit: 5 });
      hotMatchList.value = res;
      return res;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
      return [];
    }
  };

  return { hotMatchList, fetch };
};
