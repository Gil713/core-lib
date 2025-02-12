export type ISeoLinkParams = {
  canonical: string;
  linkPrev?: string;
  linkNext?: string;
};

export type ISeoLinkTag = {
  rel: string;
  href: string;
};

export type ISeoParams = {
  alias: string;
  content_title: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  seo_img: string;
};
