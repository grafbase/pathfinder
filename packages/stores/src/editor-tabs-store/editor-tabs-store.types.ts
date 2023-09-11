// import type monaco from "monaco-graphql/esm/monaco-editor";
import type monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoIPosition = monaco.IPosition;

import { ExecutionResponse } from "../schema-store";

export type EditorTab = {
  tabId: string;
  tabName: string;
  /**
   * The cursor position within the document editor
   */
  cursorPosition: MonacoIPosition | null;
  /**
   * The full string value of the document editor, used during rehydration
   */
  documentString: string;
  /**
   * We keep a record of the latest response for this tab so we can rehydrate with the latest response
   */
  latestResponse: ExecutionResponse | null;
};

export type EditorTabsStoreState = {
  /**
   * A boolean indicating whether Zustand's persist middleware has rehydrated our state
   */
  _hasHydrated: boolean;

  activeTab: EditorTab;
  tabs: EditorTab[];
};

export type EditorTabsStoreActions = {
  closeEditorTab: ({ tabId }: { tabId: string }) => void;
  initNewEditorTab: () => void;
  switchEditorTab: ({ destinationTabId }: { destinationTabId: string }) => void;
  updateActiveEditorTab: ({
    partialTab,
  }: {
    partialTab: Partial<EditorTab>;
  }) => void;
};
