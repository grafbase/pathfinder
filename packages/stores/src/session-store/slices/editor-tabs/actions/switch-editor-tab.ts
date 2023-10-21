import { RESPONSE_EDITOR_DEFAULT_VALUE } from '@pathfinder-ide/shared';

import { sessionStore } from '../../../session-store';

import { setEditorValues } from './set-editor-values';

import type { EditorTabsActions } from '../editor-tabs.types';

export const switchEditorTab: EditorTabsActions['switchEditorTab'] = ({
  destinationTabId,
}) => {
  const tabs = sessionStore.getState().tabs;

  const destinationTab = tabs.find((tab) => tab.tabId === destinationTabId);

  if (destinationTab) {
    // the order of ops is critical here.
    // when we call setValue on the documentEditor here, it's going to run our setDocumentState function.
    // the call to setDocumentState will update the documentString and tabName for our activeTab,
    // so we need to set the activeTab _first_

    sessionStore.setState({
      activeTab: destinationTab,
    });

    return setEditorValues({
      newDocumentEditorValue: destinationTab.documentString,
      newResponseEditorValue: destinationTab.latestResponse?.response.data
        ? JSON.stringify(destinationTab.latestResponse?.response.data, null, 2)
        : RESPONSE_EDITOR_DEFAULT_VALUE,
    });
  }
};
