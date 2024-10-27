import { StoreApi } from 'zustand';

import { TertiaryPaneType } from '../types';
import { GraphQLDirective, GraphQLField, GraphQLNamedType } from 'graphql';

export type TertiaryPaneStackItem = {
  hash: string;
  pane: TertiaryPaneType;
};

export type PaneItem = {
  id: string;
  name: string;
  pane:
    | GraphQLNamedType[]
    | readonly GraphQLDirective[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | GraphQLField<any, any>[];
};

export type SchemaDocumentationStoreActions = {
  navigatePanes: ({ index, pane }: { index: number; pane?: PaneItem }) => void;
  clearPaneStack: () => void;
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
  panes: PaneItem[];
  activeTertiaryPane: TertiaryPaneStackItem | null;
  tertiaryPaneStack: TertiaryPaneStackItem[];
};

export type GetSchemaDocumentationStore = StoreApi<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>['getState'];
export type SetSchemaDocumentationStore = StoreApi<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>['setState'];
