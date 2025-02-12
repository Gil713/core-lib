import { joinURL } from "ufo";

export default defineEventHandler((event) => {
  const proxyURL = useRuntimeConfig().PROMOTION_API_PROXY;
  const path = event.path.replace(/^\/api\/promotion\/v1/, ""); // /api/promotion/v1/brand/games => brand/games
  const target = joinURL(proxyURL, path);

  return proxyRequest(event, target);
});
