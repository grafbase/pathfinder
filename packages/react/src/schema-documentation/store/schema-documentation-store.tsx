import { createStore } from 'zustand';

import { schemaDocumentationStoreActions } from './actions';
import { schemaDocumentationState } from './state';
import {
  SchemaDocumentationStoreState,
  SchemaDocumentationStoreActions,
} from './schema-documentation-store.types';

const schemaDocumentationStore = createStore<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>()((set, get) => ({
  ...schemaDocumentationState,
  ...schemaDocumentationStoreActions(set, get),
}));

import { createZustandSelectors } from '@pathfinder-ide/shared';

export const useSchemaDocumentationStore = createZustandSelectors(
  schemaDocumentationStore,
);
