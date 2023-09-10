import { editorTabsStore } from "../editor-tabs-store";

import type {
  EditorTab,
  EditorTabsStoreActions,
} from "../editor-tabs-store.types";

export const updateActiveEditorTab: EditorTabsStoreActions["updateActiveEditorTab"] =
  ({ partialTab }) => {
    const activeTab = editorTabsStore.getState().activeTab;
    const tabs = editorTabsStore.getState().tabs;

    const updatedTab: EditorTab = {
      tabId: partialTab.tabId || activeTab.tabId,
      tabName: partialTab.tabName || activeTab.tabName,
      cursorPosition: partialTab.cursorPosition || activeTab.cursorPosition,
      documentString: partialTab.documentString || activeTab.documentString,
      latestResponse: partialTab.latestResponse || activeTab.latestResponse,
    };

    const index = tabs.indexOf(activeTab);

    if (index !== -1) {
      tabs[index] = updatedTab;
    }

    return editorTabsStore.setState({
      activeTab: updatedTab,
      tabs,
    });
  };
