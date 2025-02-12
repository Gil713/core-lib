export default function createStaticNewsParamsBuilder() {
  const params: Partial<IStaticNewsParams> = {};
  const baseBuilder = createBaseParamsBuilder<IStaticNewsParams>(params);

  return {
    ...baseBuilder,
    buildAlias(alias: IStaticNewsParams["alias"]) {
      params.alias = alias;
      return this;
    },

    build() {
      return params;
    },
  };
}
