import { StoreApi, useStore as zustandStore } from 'zustand';

// ? https://docs.pmnd.rs/zustand/guides/auto-generating-selectors#vanilla-store

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createZustandSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => zustandStore(_store, (s) => s[k as keyof typeof s]);
  }

  return store;
};
