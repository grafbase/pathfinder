import { createContext, useContext, useMemo } from "react";

import { createStore, useStore } from "zustand";

import { useResizerActions } from "./actions";
import { useResizerState } from "./state";
import { UseResizerStore } from "./use-resizer.types";

const createResizerStore = () =>
  createStore<UseResizerStore>((set, get) => ({
    ...useResizerState,
    ...useResizerActions(set, get),
  }));

const ResizerContext = createContext<ReturnType<
  typeof createResizerStore
> | null>(null);

export const ResizerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useMemo(() => {
    return createResizerStore();
  }, []);

  return (
    <ResizerContext.Provider value={store}>{children}</ResizerContext.Provider>
  );
};

export const useResizer = () => {
  const store = useContext(ResizerContext);
  if (store === null) {
    throw new Error("Component must be wrapped in a ResizerProvider");
  }
  return useStore(store);
};
