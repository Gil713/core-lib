type IBaseParams = {
  limit?: number;
  page?: number;
  sort_by?: string;
};

export default function createBaseParamsBuilder<T extends object>(params: Partial<T> & IBaseParams = {}) {
  return {
    buildLimit(limit: IBaseParams["limit"]) {
      params.limit = limit;
      return this;
    },

    buildPage(page: IBaseParams["page"]) {
      params.page = page;
      return this;
    },

    buildSortBy(sortBy: IBaseParams["sort_by"]) {
      params.sort_by = sortBy;
      return this;
    },

    build() {
      return params;
    },
  };
}
