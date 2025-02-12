import type { AsyncDataOptions, NuxtApp } from "nuxt/app";
import type { FetchError } from "ofetch";

export const useApi = <T>(key: string, handler: (ctx?: NuxtApp) => Promise<T>, options?: AsyncDataOptions<T>) => {
  const nuxt = useNuxtApp();
  return useAsyncData<T, FetchError<INuxtCustomError>>(key, handler, {
    ...options,
    getCachedData(key) {
      const data = nuxt.payload.data[key] || nuxt.static.data[key];
      if (!data) {
        return;
      }
      return data;
    },
  });
};
