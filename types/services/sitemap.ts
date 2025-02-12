import type { SitemapUrl } from "#sitemap/types";
type ISitemapUrl = {
  type: string;
  alias: string; //loc
  created_at: string;
  updated_at: string;
  priority: SitemapUrl["priority"];
  changefreq: SitemapUrl["changefreq"];
};

type ISitemapIndex = {
  [key: string]: ISitemapUrl[];
};

export type ISitemapResponse = {
  code: number;
  status: ResponseStatusEnum;
  data: ISitemapIndex;
};
