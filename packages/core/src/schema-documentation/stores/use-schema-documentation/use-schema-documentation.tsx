import { createContext, useContext, useMemo } from "react";

import { createStore, useStore } from "zustand";

import { useSchemaDocumentationActions } from "./actions";
import { useSchemaDocumentationState } from "./state";
import { UseSchemaDocumentationStore } from "./use-schema-documentation.types";

const createMyStore = () =>
  createStore<UseSchemaDocumentationStore>((set, get) => ({
    ...useSchemaDocumentationState,
    ...useSchemaDocumentationActions(set, get),
  }));

const SchemaDocumentationContext = createContext<ReturnType<
  typeof createMyStore
> | null>(null);

export const SchemaDocumentationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useMemo(() => {
    return createMyStore();
  }, []);

  return (
    <SchemaDocumentationContext.Provider value={store}>
      {children}
    </SchemaDocumentationContext.Provider>
  );
};

export const useSchemaDocumentation = () => {
  const store = useContext(SchemaDocumentationContext);
  if (store === null) {
    throw new Error(
      "Component must be wrapped in a SchemaDocumentationProvider",
    );
  }
  return useStore(store);
};
