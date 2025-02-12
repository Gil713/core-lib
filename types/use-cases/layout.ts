export type ICommonTab = {
  value: string;
  name: string;
  url?: string;
  icon?: string;
  content?: Component;
};

export type IStaticPageMainTab = ICommonTab & {
  value: StaticPageAliasEnum;
};
