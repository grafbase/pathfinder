import { StoreApi } from "zustand";

import { TertiaryPaneType, TopLevelPane } from "../../types";

type TertiaryPaneStackItem = { hash: string; pane: TertiaryPaneType };

export type UseSchemaDocumentationActions = {
  setActivePrimaryPane: ({
    destinationPane,
  }: {
    destinationPane: TopLevelPane;
  }) => void;
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

export type UseSchemaDocumentationState = {
  activePrimaryPane: TopLevelPane;
  activeTertiaryPane: TertiaryPaneStackItem | null;
  tertiaryPaneStack: TertiaryPaneStackItem[];
};

export type UseSchemaDocumentationStore = UseSchemaDocumentationActions &
  UseSchemaDocumentationState;

export type GetUseSchemaDocumentationStore =
  StoreApi<UseSchemaDocumentationStore>["getState"];
export type SetUseSchemaDocumentationStore =
  StoreApi<UseSchemaDocumentationStore>["setState"];
