import { sessionStore } from '../../../session-store';

import type { EditorTab, EditorTabsActions } from '../editor-tabs.types';

export const updateEditorTab: EditorTabsActions['updateEditorTab'] = ({
  partialTab,
  targetTabId,
}) => {
  const tabs = sessionStore.getState().tabs;

  const activeTab = sessionStore.getState().activeTab as EditorTab;

  const isTargetTabActive = activeTab.tabId === targetTabId;

  const targetTab = sessionStore
    .getState()
    .tabs.find((tab) =>
      tab.tabId === targetTabId ? targetTabId : activeTab.tabId,
    ) as EditorTab;

  const updatedTab: EditorTab = {
    ...(isTargetTabActive ? activeTab : targetTab),
    ...partialTab,
  };

  const foundTab = tabs.indexOf(isTargetTabActive ? activeTab : targetTab);

  if (foundTab !== -1) {
    tabs[foundTab] = updatedTab;
  }

  return sessionStore.setState({
    activeTab: isTargetTabActive ? updatedTab : activeTab,
    tabs,
  });
};
