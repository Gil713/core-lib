type IParams = {
  partnerProvider: string;
  partnerGameId: string;
  route: string;
  is_demo?: boolean;
};

export default function createFetchGameDetailParamsBuilder() {
  const params: Partial<IParams> = {};

  return {
    buildTrial(is_demo: IParams["is_demo"]) {
      params.is_demo = is_demo;
      return this;
    },

    buildRoute(route: IParams["route"]) {
      params.route = route;
      return this;
    },

    buildProvider(provider: IParams["partnerProvider"]) {
      params.partnerProvider = provider;
      return this;
    },

    buildGameId(gameId: IParams["partnerGameId"]) {
      params.partnerGameId = gameId;
      return this;
    },
    build() {
      return params as IParams;
    },
  };
}
