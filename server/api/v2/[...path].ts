import { joinURL } from "ufo";

export default defineEventHandler((event) => {
  const proxyURL = useRuntimeConfig().API_PROXY_V2;
  const path = event.path.replace(/^\/api\/v2/, ""); // /api/v2/brand/games => brand/games
  const target = joinURL(proxyURL, path);

  return proxyRequest(event, target);
});
