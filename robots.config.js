module.exports = [
  { UserAgent: "*" },
  { Disallow: "/account/*" },
  { Disallow: "/*" },
  { Sitemap: (req) => `https://${req.headers.host}/sitemap_index.xml` },
];
