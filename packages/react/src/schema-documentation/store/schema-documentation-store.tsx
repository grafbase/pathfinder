import { createContext, useContext, useMemo } from 'react';

import { createStore, useStore } from 'zustand';

import { schemaDocumentationStoreActions } from './actions';
import { schemaDocumentationState } from './state';
import {
  SchemaDocumentationStoreState,
  SchemaDocumentationStoreActions,
} from './schema-documentation-store.types';

const schemaDocumentationStore = () =>
  createStore<SchemaDocumentationStoreState & SchemaDocumentationStoreActions>(
    (set, get) => ({
      ...schemaDocumentationState,
      ...schemaDocumentationStoreActions(set, get),
    }),
  );

const SchemaDocumentationStoreContext = createContext<ReturnType<
  typeof schemaDocumentationStore
> | null>(null);

export const SchemaDocumentationStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useMemo(() => {
    return schemaDocumentationStore();
  }, []);

  return (
    <SchemaDocumentationStoreContext.Provider value={store}>
      {children}
    </SchemaDocumentationStoreContext.Provider>
  );
};

export const useSchemaDocumentationStore = () => {
  const store = useContext(SchemaDocumentationStoreContext);
  if (store === null) {
    throw new Error('Component must be wrapped in a SchemaDocumentationProvider');
  }
  return useStore(store);
};
