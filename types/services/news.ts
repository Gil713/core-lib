// These alias may extends by admin who write news
export enum CategoryAliasEnum {
  TIN_TUC = "tin-tuc",
  KHUYEN_MAI = "khuyen-mai",
}

export enum NewsCategoryAliasEnum {
  ALL = "all",
}

export type INewsPost = {
  id?: string;
  alias: string;
  title: string;
  time: string;
  img: string;
  category?: string;
  thumbnail?: string;
  category_ids?: number[];
  created_at: string;
  description: string;
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
  seo_img?: string;
  className?: string;
  content?: string;
  related_news?: INewsPost[];
  paths?: string[];
};

export type INewsPostResponse = {
  page: number;
  limit: number;
  total_page: number;
  total: number;
  items: INewsPost[];
};
