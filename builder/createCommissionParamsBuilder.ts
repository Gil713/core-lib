export enum CommissionEnum {
  YESTERDAY = "YESTERDAY",
}

type ICommissionParams = {
  type: CommissionEnum;
};

export default function createCommissionParamsBuilder() {
  const params: Partial<ICommissionParams> = {};
  const baseBuilder = createBaseParamsBuilder<ICommissionParams>(params);

  return {
    ...baseBuilder,
    buildType(type: ICommissionParams["type"]) {
      if (type) {
        params.type = type;
      }
      return this;
    },
  };
}
