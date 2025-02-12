import { joinURL } from "ufo";

export default defineEventHandler((event) => {
  const proxyURL = useRuntimeConfig().API_PROXY_V1;
  const path = event.path.replace(/\/api\/v1/, ""); // /api/v1/brand/games => brand/games
  const target = joinURL(proxyURL, path);

  return proxyRequest(event, target);
});
