import { sessionStore } from "../../../session-store";

import { setEditorValues } from "./set-editor-values";

import type { EditorTabsActions } from "..//editor-tabs.types";

export const closeEditorTab: EditorTabsActions["closeEditorTab"] = ({
  tabId,
}) => {
  const isActiveTab = tabId === sessionStore.getState().activeTab.tabId;

  const filteredTabs = sessionStore
    .getState()
    .tabs.filter((tab) => tab.tabId !== tabId);

  if (isActiveTab) {
    // if we're closing the active tab, we set the first tab as the activeTab
    sessionStore.setState({
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
    return sessionStore.setState({
      tabs: filteredTabs,
    });
  }
};
