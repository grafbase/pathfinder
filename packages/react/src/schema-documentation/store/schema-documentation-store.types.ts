import { StoreApi } from 'zustand';

import { DetailsPaneType } from '../types';
import { GraphQLDirective, GraphQLField, GraphQLNamedType } from 'graphql';

export type DetailsPaneStackItem = {
  hash: string;
  pane: DetailsPaneType;
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
  clearDetailsPaneStack: () => void;
  navigateDetailsPaneStack: ({
    destinationPaneIndex,
  }: {
    destinationPaneIndex: number;
  }) => void;
  setActiveDetailsPane: ({
    destinationPane,
    reset,
  }: {
    destinationPane: DetailsPaneType;
    reset?: boolean;
  }) => void;
};

export type SchemaDocumentationStoreState = {
  detailsPaneStack: DetailsPaneStackItem[];
  activeDetailsPane: DetailsPaneStackItem | null;
  panes: PaneItem[];
};

export type GetSchemaDocumentationStore = StoreApi<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>['getState'];
export type SetSchemaDocumentationStore = StoreApi<
  SchemaDocumentationStoreState & SchemaDocumentationStoreActions
>['setState'];
