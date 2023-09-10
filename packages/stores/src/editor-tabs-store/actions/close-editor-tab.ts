import { editorTabsStore } from "../editor-tabs-store";

import type { EditorTabsStoreActions } from "../editor-tabs-store.types";

import { setEditorValues } from "./set-editor-values";

export const closeEditorTab: EditorTabsStoreActions["closeEditorTab"] = ({
  tabId,
}) => {
  const isActiveTab = tabId === editorTabsStore.getState().activeTab.tabId;

  const filteredTabs = editorTabsStore
    .getState()
    .tabs.filter((tab) => tab.tabId !== tabId);

  if (isActiveTab) {
    // if we're closing the active tab, we set the first tab as the activeTab
    editorTabsStore.setState({
      activeTab: filteredTabs[0],
      tabs: filteredTabs,
    });

    return setEditorValues({
      newDocumentEditorValue: filteredTabs[0].documentString,
      newResponseEditorValue: JSON.stringify(
        filteredTabs[0].latestResponse?.response.data,
        null,
        2,
      ),
    });
  } else {
    return editorTabsStore.setState({
      tabs: filteredTabs,
    });
  }
};
