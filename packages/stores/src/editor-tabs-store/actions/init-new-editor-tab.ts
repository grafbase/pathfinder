import { init as initCuid } from "@paralleldrive/cuid2";

import {
  DOCUMENT_EDITOR_DEFAULT_VALUE,
  RESPONSE_EDITOR_DEFAULT_VALUE,
} from "@pathfinder/shared";

import { editorTabsStore } from "../editor-tabs-store";

import { setEditorValues } from "./set-editor-values";

import type {
  EditorTab,
  EditorTabsStoreActions,
} from "../editor-tabs-store.types";

export const initNewEditorTab: EditorTabsStoreActions["initNewEditorTab"] =
  () => {
    const TAB_ID = initCuid({ length: 10 })();

    const newTab: EditorTab = {
      tabId: TAB_ID,
      tabName: TAB_ID,
      cursorPosition: null,
      documentString: DOCUMENT_EDITOR_DEFAULT_VALUE,
      latestResponse: null,
    };

    editorTabsStore.setState({
      activeTab: newTab,
      tabs: [...editorTabsStore.getState().tabs, newTab],
    });

    return setEditorValues({
      newDocumentEditorValue: newTab.documentString,
      newResponseEditorValue: RESPONSE_EDITOR_DEFAULT_VALUE,
    });
  };
