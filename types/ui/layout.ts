export type ISidebarOption = {
  query?: Record<string, string | string[] | undefined>;
  title?: string;
  alias?: GameAliasEnum; // alias to call api
};

export type IMobileSidebarItem = {
  icon: string;
  name: string;
  url: string;
  options?: ISidebarOption[];
  showOptions: boolean;
};

export enum StaticPageAliasEnum {
  INTRODUCTION = "gioi-thieu",
  GUIDE = "huong-dan",
  QUESTION = "cau-hoi-thuong-gap",
}
