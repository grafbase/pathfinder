import type { MonacoIPosition } from "../../../monaco-editor-store";

import type { ExecutionResponse } from "../../../schema-store";

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

export type EditorTabsState = {
  activeTab: EditorTab;
  tabs: EditorTab[];
};

export type EditorTabsActions = {
  closeEditorTab: ({ tabId }: { tabId: string }) => void;
  initNewEditorTab: () => void;
  switchEditorTab: ({ destinationTabId }: { destinationTabId: string }) => void;
  updateActiveEditorTab: ({
    partialTab,
  }: {
    partialTab: Partial<EditorTab>;
  }) => void;
};
