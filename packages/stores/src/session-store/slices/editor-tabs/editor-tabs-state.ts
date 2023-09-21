import {
  DOCUMENT_EDITOR_DEFAULT_VALUE,
  generateCuid,
} from "@pathfinder/shared";

import type { EditorTab, EditorTabsState } from "./editor-tabs.types";

const INITIAL_EDITOR_TAB_ID = generateCuid({});

export const INITIAL_EDITOR_TAB: EditorTab = {
  tabId: INITIAL_EDITOR_TAB_ID,
  tabName: INITIAL_EDITOR_TAB_ID,
  cursorPosition: null,
  documentString: DOCUMENT_EDITOR_DEFAULT_VALUE,
  latestResponse: null,
};

const INITIAL_EDITOR_TABS_STATE: EditorTabsState = {
  activeTab: INITIAL_EDITOR_TAB,
  tabs: [INITIAL_EDITOR_TAB],
};

export const editorTabsState = {
  ...INITIAL_EDITOR_TABS_STATE,
};
