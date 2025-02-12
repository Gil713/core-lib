const createNavigationLinks = (prev?: string, next?: string): ISeoLinkTag[] => {
  const links: ISeoLinkTag[] = [];
  if (prev) {
    links.push({
      rel: "prev",
      href: prev,
    });
  }
  if (next) {
    links.push({
      rel: "next",
      href: next,
    });
  }
  return links;
};

export const usePaginationSeo = ({ canonical, linkPrev, linkNext }: ISeoLinkParams): void => {
  const createCanonicalLink = (canonicalHref: string): ISeoLinkTag => ({
    rel: "canonical",
    href: canonicalHref,
  });

  const links: ISeoLinkTag[] = [createCanonicalLink(canonical), ...createNavigationLinks(linkPrev, linkNext)];

  useHead({ link: links });
};
