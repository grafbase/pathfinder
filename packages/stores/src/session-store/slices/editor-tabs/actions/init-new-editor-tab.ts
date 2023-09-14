import { init as initCuid } from "@paralleldrive/cuid2";

import {
  DOCUMENT_EDITOR_DEFAULT_VALUE,
  RESPONSE_EDITOR_DEFAULT_VALUE,
} from "@pathfinder/shared";

import { sessionStore } from "../../../session-store";

import { setEditorValues } from "./set-editor-values";

import type { EditorTab, EditorTabsActions } from "../editor-tabs.types";

export const initNewEditorTab: EditorTabsActions["initNewEditorTab"] = () => {
  const TAB_ID = initCuid({ length: 10 })();

  const newTab: EditorTab = {
    tabId: TAB_ID,
    tabName: TAB_ID,
    cursorPosition: null,
    documentString: DOCUMENT_EDITOR_DEFAULT_VALUE,
    latestResponse: null,
  };

  sessionStore.setState({
    activeTab: newTab,
    tabs: [...sessionStore.getState().tabs, newTab],
  });

  return setEditorValues({
    newDocumentEditorValue: newTab.documentString,
    newResponseEditorValue: RESPONSE_EDITOR_DEFAULT_VALUE,
  });
};