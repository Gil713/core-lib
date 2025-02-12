import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrl } from "#sitemap/types";
import type { ISitemapResponse } from "~/types/services/sitemap";

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();

  const res = await $fetch<ISitemapResponse>(`${config.API_PROXY_V1}/brand/sitemap`, {
    headers: { Cookie: `brand_code=${config.BRAND_CODE}` },
  });

  const sitemapNames = Object.keys(res.data);
  return sitemapNames.reduce((acc: SitemapUrl[], sitemapName: string) => {
    const urls = res.data[sitemapName].map((item) => ({
      loc: item.alias,
      priority: item.priority,
      changefreq: item.changefreq,
      _sitemap: sitemapName,
    }));

    return [...acc, ...urls];
  }, []);
});
