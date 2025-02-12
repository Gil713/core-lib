export default defineEventHandler(({ node }) => {
  const { req, res } = node;

  const config = useRuntimeConfig();

  let ip = req.headers?.["x-forwarded-for"] ?? "";
  ip = ip.split(",")[0];
  let IP_WHITELIST: (string | string[])[] = [];
  if (config.public.IP_WHITELIST) {
    IP_WHITELIST = config.public.IP_WHITELIST.split(",");
  }
  if (req.originalUrl !== "/whitelist" && config.public.CHECK_IP === "1" && !IP_WHITELIST.includes(ip)) {
    if (req.originalUrl !== "/whitelist") {
      const cookie = req.headers.cookie;
      if (cookie && !cookie.includes("email_whitelist")) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Access Denied");
      }
    }
  }
});
