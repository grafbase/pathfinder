import { RESPONSE_EDITOR_DEFAULT_VALUE } from "@pathfinder/shared";

import { setEditorValues } from "./set-editor-values";

import { editorTabsStore } from "../editor-tabs-store";

import type { EditorTabsStoreActions } from "../editor-tabs-store.types";

export const switchEditorTab: EditorTabsStoreActions["switchEditorTab"] = ({
  destinationTabId,
}) => {
  const tabs = editorTabsStore.getState().tabs;

  const destinationTab = tabs.find((tab) => tab.tabId === destinationTabId);

  if (destinationTab) {
    // the order of ops is critical here.
    // when we call setValue on the documentEditor here, it's going to run our setDocumentState function.
    // the call to setDocumentState will update the documentString and tabName for our activeTab,
    // so we need to set the activeTab _first_

    editorTabsStore.setState({
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
