export default defineEventHandler((event) => {
  const { req } = event.node;
  const url = getRequestURL(event);

  const allowedApis = ["/api/v1", "/api/v2", "/api/promotion"];
  if (!allowedApis.some((api) => url.pathname.startsWith(api))) return;

  const brandCode = useRuntimeConfig().BRAND_CODE;

  const headers = req.headers;
  const cookieList = headers.cookie?.split("; ");
  const cookieMap = new Map();

  if (cookieList) {
    cookieList.forEach((item) => {
      const [key, value] = item.split("=");
      cookieMap.set(key, value);
    });
  }

  cookieMap.set("brand_code", brandCode);
  cookieMap.set("host", headers.host);

  const newCookie = Array.from(cookieMap)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  req.headers.cookie = newCookie;
});
