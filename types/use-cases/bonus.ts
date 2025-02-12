export type IBonusItem = {
  overviews: IBonusInfo[];
  details: IBonusInfo[];
};

export type IBonusStatisticItem = {
  title: string;
  icon: string;
  actionTitle?: string;
  descriptionHtml?: string;
  amount: number;
};

export type IBonusInfo = {
  title: string;
  description: string;
  desClass?: BonusClassEnum;
};

export enum BonusClassEnum {
  STATUS = "bg-[rgba(17,169,93,0.10)] px-3 py-2 rounded-lg text-[#11a95d] text-sm font-normal",
  HIGHLIGHT = "text-text-money font-semibold uppercase",
  UPPERCASE = "font-semibold uppercase",
}
