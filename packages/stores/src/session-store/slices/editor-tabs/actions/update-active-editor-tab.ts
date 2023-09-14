import { sessionStore } from "../../../session-store";

import type { EditorTab, EditorTabsActions } from "../editor-tabs.types";

export const updateActiveEditorTab: EditorTabsActions["updateActiveEditorTab"] =
  ({ partialTab }) => {
    const activeTab = sessionStore.getState().activeTab as EditorTab;
    const tabs = sessionStore.getState().tabs;

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

    return sessionStore.setState({
      activeTab: updatedTab,
      tabs,
    });
  };
