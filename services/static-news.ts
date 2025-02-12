import type { $Fetch } from "nitropack";

export const StaticAndNewsService = (fetchFn: $Fetch): IStaticAndNewsService => ({
  async getCategoryByAlias(alias: string): Promise<IStaticNewsCategory[]> {
    const categoryParams = createStaticNewsParamsBuilder().buildAlias(alias).build();
    const categoryOptions = createFetchOptionsBuilder().buildMethod("GET").buildParams(categoryParams).build();

    const res = await fetchFn<IApiResponse<IStaticNewsCategory[]>>(
      getStaticAndNewsEndPoints().getCategories(),
      categoryOptions,
    );

    return res.data;
  },

  async getDetailByAlias(alias: string): Promise<IStaticNewsDetail> {
    const detailOptions = createFetchOptionsBuilder().buildMethod("GET").build();

    const res = await fetchFn<IApiResponse<IStaticNewsDetail>>(
      getStaticAndNewsEndPoints().getDetails(alias),
      detailOptions,
    );

    return res.data;
  },

  async getStaticNews(getStaticNewsParams: IStaticNewsParams): Promise<INewsPostResponse> {
    const params = createStaticNewsParamsBuilder()
      .buildAlias(getStaticNewsParams.alias)
      .buildPage(getStaticNewsParams.page)
      .buildLimit(getStaticNewsParams.limit)
      .build();
    const detailOptions = createFetchOptionsBuilder().buildMethod("GET").buildParams(params).build();

    const res = await fetchFn<IApiResponse<INewsPostResponse>>(
      getStaticAndNewsEndPoints().getStaticNews(),
      detailOptions,
    );

    return res.data;
  },
});
