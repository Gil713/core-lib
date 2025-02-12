export type IStaticNewsParams = {
  alias: string;
  page?: number;
  limit?: number;
};

export type IStaticNewsCategory = {
  alias: string;
  display_name: string;
  icon: string;
};

export type IStaticNewsDetail = {
  alias: string;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  content: string;
  created_at: string;
  updated_at: string;
  paths: string[];
  seo_img: string;
  related_news: IRelatedNews[];
};

export type IRelatedNews = {
  alias: string;
  title: string;
  description: string;
  img: string;
  tags: INewsTags;
};

export type INewsTags = {
  name: string;
  code: string;
  img: string;
};

export type IStaticAndNewsService = {
  getCategoryByAlias: (alias: string) => Promise<IStaticNewsCategory[]>;
  getDetailByAlias: (alias: string) => Promise<IStaticNewsDetail>;
  getStaticNews: (getStaticNewsParams: IStaticNewsParams) => Promise<INewsPostResponse>;
};
