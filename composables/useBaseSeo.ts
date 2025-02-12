const createCanonicalLink = (canonicalHref: string): ISeoLinkTag => ({
  rel: "canonical",
  href: canonicalHref,
});

export const useBaseSeo = ({ content_title, meta_title, meta_description, alias, seo_img }: ISeoParams) => {
  // remove meta_keyword or keyword on head because:
  // Search engine optimization snake-oil salespeople abused the keywords meta tag by
  // stuffing them with comma-separated lists of spam words instead of lists of relevant key terms,
  // so search engines don't consider this metadata to be useful anymore.
  // => No need to waste time, effort, or bytes adding it.
  // ref: https://web.dev/learn/html/metadata/#keywords

  useSeoMeta({
    title: content_title,
    description: meta_description,
    ogTitle: meta_title,
    ogDescription: meta_description,
    ogImage: seo_img,
    ogUrl: alias,
    twitterCard: "summary_large_image",
    twitterTitle: meta_title,
    twitterDescription: meta_description,
    twitterImage: seo_img,
    //TODO: Meidai need to double check twitter:url
  });

  useHead({
    title: content_title,
    link: [createCanonicalLink(alias)],
  });
};
