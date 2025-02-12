type IParams = {
  alias: string;
};

export default function createFetchGameAliasesParamsBuilder() {
  const params: Partial<IParams> = {};

  return {
    buildAlias(pathAlias: IParams["alias"]) {
      params.alias = pathAlias;
      return this;
    },
    build() {
      return params;
    },
  };
}
