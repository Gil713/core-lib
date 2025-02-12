export type ISeoBase = {
  type: string;
  alias: string;
  content_title: string;
  content_description: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  seo_img: string;
  created_at: string;
  updated_at: string;
};

export type ISeoChildren = ISeoBase;

export type ISeoResponse = ISeoBase & {
  children: ISeoChildren;
};

export type IBrandAssets = {
  logo: string;
  favicon: string;
  domain: string;
  google_site_verification: string[];
  gtm_id: string[];
  meta_pixel_id: string;
  logo_header: string;
  logo_footer: string;
  favicon_16_16: string;
  favicon_32_32: string;
  apple_touch_icon: string;
};

export type ISeoService = {
  getSeoInfo: () => Promise<ISeoResponse>;
  getBrandInfo: () => Promise<IBrandAssets>;
};
