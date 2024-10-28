import { StoreApi } from 'zustand';

import { DetailsPaneType } from '../types';
import {
  GraphQLDirective,
  GraphQLField,
  GraphQLNamedType,
  GraphQLObjectType,
} from 'graphql';

export type DetailsPaneStackItem = {
  hash: string;
  pane: DetailsPaneType;
  /** optional `parentType` can be valuable when using the details pane slot component prop */
  parentType?: GraphQLObjectType;
};

export type PaneItem = {
  id: string;
  name: string;
  items:
    | GraphQLNamedType[]
    | readonly GraphQLDirective[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | GraphQLField<any, any>[];
  /** optional `parentType` here is used as a pass-through so we can access in pane-item.tsx via the panes store */
  parentType?: GraphQLObjectType;
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
    parentType,
    reset,
  }: {
    destinationPane: DetailsPaneType;
    parentType?: GraphQLObjectType;
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
