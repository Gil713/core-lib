import { defineNitroPlugin } from "nitropack/runtime";
import type { ISitemapResponse } from "~/types/services/sitemap";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("sitemap:index-resolved", async (ctx) => {
    const config = useRuntimeConfig();

    // Get data sitemap
    const res = await $fetch<ISitemapResponse>(`${config.API_PROXY_V1}/brand/sitemap`, {
      headers: { Cookie: `brand_code=${config.BRAND_CODE}` },
    });

    // Remove sitemap without data
    const sitemapNames = Object.keys(res.data);
    const sitemaps = ctx.sitemaps.filter((sitemap: { _sitemapName: string }) =>
      sitemapNames.includes(sitemap._sitemapName),
    );

    ctx.sitemaps = sitemaps;
  });
});
