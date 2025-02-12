import type { LocationQuery } from "vue-router";

export const useSport = () => {
  const { $sportService } = useNuxtApp();
  const { $device } = useNuxtApp();
  const router = useRouter();

  const getSportUrlProvider = async (
    sportProvider: SportProvidersEnum,
    match: Pick<IMatchDetailData, "match_id" | "league_id" | "live"> | LocationQuery,
  ): Promise<ISportUrlProvider> => {
    return $sportService.getSportUrl({ sportProvider, match });
  };

  const getMatchAndLeagueIds = (
    match: IMatchDetailData,
    sportProvider: SportProvidersEnum,
  ): { matchId: number; leagueId: number } => {
    if (sportProvider === SportProvidersEnum.KSPORTS) {
      return {
        matchId: match.match_id || match.ksport_match_id,
        leagueId: match.league_id || match.ksport_league_id,
      };
    } else {
      return {
        matchId: match.athena_match_id,
        leagueId: match.athena_league_id,
      };
    }
  };

  const playSport = async ({
    match,
    sportProvider,
    isOpenNewTab = false,
  }: {
    match: IMatchDetailData;
    sportProvider: SportProvidersEnum;
    isOpenNewTab?: boolean;
  }): Promise<void> => {
    try {
      const { matchId, leagueId } = getMatchAndLeagueIds(match, sportProvider);
      const sportProviderPath = `${APP_PATH.SPORT}/${sportProvider}`;

      const queryParams = createMatchQueryBuilder()
        .buildMatchId(matchId)
        .buildLeagueId(leagueId)
        .buildLive(match.live)
        .build();

      if ($device.isMobileOrTablet) {
        const openNewTab = window.open("about:blank", "_blank")!;

        const res = await getSportUrlProvider(sportProvider, {
          match_id: matchId,
          league_id: leagueId,
          live: match.live || "",
        });

        // TODO: need to be verify what if response maintenance
        if (res.maintenance) {
          openNewTab.location.href = "/maintenance"; // placeholder
          return;
        }

        openNewTab.location.href = res.url;
        return;
      }

      if (isOpenNewTab) {
        const routeData = router.resolve({ path: sportProviderPath, query: queryParams });
        window.open(routeData.href, "_blank");
        return;
      }

      router.push({ path: sportProviderPath, query: queryParams });
    } catch (error) {
      console.error("Error in handling match navigation", error);
    }
  };

  return {
    playSport,
    getSportUrlProvider,
  };
};
