import { StoreApi } from 'zustand';

import { TertiaryPaneType, TopLevelPane } from '../types';
import { GraphQLObjectType } from 'graphql';

export type TertiaryPaneStackItem = {
  hash: string;
  pane: TertiaryPaneType;
  /** For TertiaryPaneType of GraphQLField, we'll provide the parent type */
  parentType?: GraphQLObjectType;
};

export type SchemaDocumentationStoreActions = {
  setActivePrimaryPane: ({ destinationPane }: { destinationPane: TopLevelPane }) => void;
  clearTertiaryPaneStack: () => void;
  navigateTertiaryPaneStack: ({
    destinationPaneIndex,
  }: {
    destinationPaneIndex: number;
  }) => void;
  setActiveTertiaryPane: ({
    destinationPane,
    reset,
  }: {
    destinationPane: TertiaryPaneType;
    reset?: boolean;
  }) => void;
};

export type SchemaDocumentationStoreState = {
  activePrimaryPane: TopLevelPane;
  activeTertiaryPane: TertiaryPaneStackItem | null;
  tertiaryPaneStack: TertiaryPaneStackItem[];
};

export type GetSchemaDocumentationStore = StoreApi<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>['getState'];
export type SetSchemaDocumentationStore = StoreApi<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>['setState'];
