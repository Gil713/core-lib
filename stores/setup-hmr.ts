import type { StoreDefinition } from "pinia";

export const setupPiniaHMR = (storeDefinition: StoreDefinition) => {
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(storeDefinition, import.meta.hot));
  }
};
