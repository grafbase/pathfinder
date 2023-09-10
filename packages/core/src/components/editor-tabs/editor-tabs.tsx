import { shared } from "@pathfinder/style";

import {
  closeEditorTab,
  initNewEditorTab,
  switchEditorTab,
  useEditorTabsStore,
} from "@pathfinder/stores";

import { IconButton } from "../icon-button";
import { Pill } from "../pill";

import {
  addTabButtonWrapClass,
  editorTabsClass,
  tabButtonClass,
  tabWrapClass,
} from "./editor-tabs.css";

const AddTabButton = () => {
  return (
    <div className={addTabButtonWrapClass}>
      <IconButton
        action={() => initNewEditorTab()}
        iconName="Plus"
        size="medium"
        title={`Add new editor tab`}
      />
    </div>
  );
};

export const EditorTabs = () => {
  const activeTab = useEditorTabsStore.use.activeTab();
  const tabs = useEditorTabsStore.use.tabs();

  const showRemoveTabButton = tabs.length > 1;

  if (tabs.length < 1) {
    return <p>There are no tabs. This is a terrible message</p>;
  }

  return (
    <div
      className={`${editorTabsClass} ${shared.hairlineBorder({
        border: "bottom",
        onSurface: 1,
      })}`}
    >
      {tabs.map((tab) => {
        return (
          <div
            key={tab.tabId}
            className={tabWrapClass({
              isActive: activeTab.tabId === tab.tabId,
            })}
          >
            <div
              className={tabButtonClass({
                hasRemoveTabButton: showRemoveTabButton,
              })}
              onClick={() => switchEditorTab({ destinationTabId: tab.tabId })}
            >
              <Pill
                copy={tab.documentString.charAt(0).toUpperCase() || "?"}
                variant={{ color: "green" }}
              />
              {tab.tabName}
            </div>
            {showRemoveTabButton && (
              <IconButton
                action={() => closeEditorTab({ tabId: tab.tabId })}
                iconName="Close"
                size="small"
                title={`Remove tab`}
              />
            )}
          </div>
        );
      })}
      <AddTabButton />
    </div>
  );
};
