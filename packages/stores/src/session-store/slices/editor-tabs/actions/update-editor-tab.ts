import { sessionStore } from '../../../session-store';

import type { EditorTab, EditorTabsActions } from '../editor-tabs.types';

export const updateEditorTab: EditorTabsActions['updateEditorTab'] = ({
  partialTab,
  targetTabId,
}) => {
  const tabs = sessionStore.getState().tabs;

  const activeTab = sessionStore.getState().activeTab as EditorTab;

  const isTargetTabActive = sessionStore.getState().activeTab?.tabId === targetTabId;

  const targetTab = sessionStore
    .getState()
    .tabs.find((tab) =>
      tab.tabId === targetTabId ? targetTabId : activeTab.tabId,
    ) as EditorTab;

  const updatedTab: EditorTab = {
    ...(isTargetTabActive ? activeTab : targetTab),
    ...partialTab,
  };

  const index = tabs.findIndex((tab) => {
    if (
      (isTargetTabActive && tab.tabId === activeTab.tabId) ||
      (!isTargetTabActive && tab.tabId === targetTab.tabId)
    ) {
      return true;
    }

    return false;
  });

  if (index !== -1) {
    tabs[index] = updatedTab;
  }

  return sessionStore.setState({
    activeTab: isTargetTabActive ? updatedTab : activeTab,
    tabs,
  });
};
