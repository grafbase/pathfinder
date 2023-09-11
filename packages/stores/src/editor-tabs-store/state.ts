import { init as initCuid } from "@paralleldrive/cuid2";

import { DOCUMENT_EDITOR_DEFAULT_VALUE } from "@pathfinder/shared";

import type {
  EditorTab,
  EditorTabsStoreState,
} from "./editor-tabs-store.types";

const INITIAL_TAB_ID = initCuid({ length: 10 })();

const INITIAL_TAB: EditorTab = {
  tabId: INITIAL_TAB_ID,
  tabName: INITIAL_TAB_ID,
  cursorPosition: null,
  documentString: DOCUMENT_EDITOR_DEFAULT_VALUE,
  latestResponse: null,
};

export const INITIAL_TABS_STATE: EditorTabsStoreState = {
  _hasHydrated: false,
  activeTab: INITIAL_TAB,
  tabs: [INITIAL_TAB],
};

export const tabsState = {
  ...INITIAL_TABS_STATE,
};
