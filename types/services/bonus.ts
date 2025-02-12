export type ISummaryBonus = {
  deposit: number;
  withdraw: number;
  promotion: number;
  commission: number;
  stake: number;
  winlost: number;
  violateStake: number;
  rolling: number;
};

export type ICommissionBonus = {
  commission: number;
};

export type IBonusCommissionOpts = {
  commissionType: CommissionEnum;
};

export type IBonusService = {
  getSummaryBonus: () => Promise<ISummaryBonus>;
  getBonusCommission: ({ commissionType }: IBonusCommissionOpts) => Promise<ICommissionBonus>;
};
