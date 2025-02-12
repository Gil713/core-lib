type IParams = {
  provider_code?: string;
  path_alias?: string;
};

export default function createFetchGamesParamsBuilder() {
  const params: IParams = {};
  const baseBuilder = createBaseParamsBuilder<IParams>(params);

  return {
    ...baseBuilder,
    buildProvider(provider: IParams["provider_code"]) {
      if (provider && provider !== ALL_PROVIDER_QUERY) {
        params.provider_code = provider;
      }

      return this;
    },

    buildPathAlias(pathAlias: IParams["path_alias"]) {
      params.path_alias = pathAlias;
      return this;
    },
  };
}
