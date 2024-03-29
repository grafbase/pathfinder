import { WheelEvent, useRef } from 'react';

import {
  closeEditorTab,
  initNewEditorTab,
  switchEditorTab,
  useSessionStore,
} from '@pathfinder-ide/stores';

import { IconButton } from '../icon-button';
import { Pill } from '../pill';

import {
  addTabButtonWrapClass,
  editorTabsClass,
  tabButtonClass,
  tabWrapClass,
} from './editor-tabs.css';

export const EditorTabs = () => {
  const ref = useRef<HTMLDivElement>(null);

  const activeTab = useSessionStore.use.activeTab();
  const tabs = useSessionStore.use.tabs();

  const showRemoveTabButton = tabs.length > 1;

  const onWheel = (e: WheelEvent) => {
    const el = ref.current;
    if (el) {
      if (e.deltaY == 0) return;
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
      });
    }
  };

  if (tabs.length < 1) {
    return <p>There are no tabs. This is a terrible message</p>;
  }

  return (
    <div ref={ref} onWheel={onWheel} className={editorTabsClass}>
      {tabs.map((tab) => {
        const operationType = tab.documentString.charAt(0).toUpperCase();

        return (
          <div
            key={tab.tabId}
            className={tabWrapClass({
              isActive: activeTab?.tabId === tab.tabId,
            })}
          >
            <div
              className={tabButtonClass({
                hasRemoveTabButton: showRemoveTabButton,
              })}
              onClick={() => switchEditorTab({ destinationTabId: tab.tabId })}
            >
              <Pill
                copy={operationType || '?'}
                variant={{
                  color:
                    operationType === 'Q'
                      ? 'blue'
                      : operationType === 'M'
                        ? 'purple'
                        : 'yellow',
                }}
              />
              {tab.tabName}
            </div>
            {showRemoveTabButton && (
              <IconButton
                action={() => closeEditorTab({ tabId: tab.tabId })}
                iconName="Close"
                size="medium"
                title={`Remove tab`}
              />
            )}
          </div>
        );
      })}
      <div className={addTabButtonWrapClass}>
        <IconButton
          action={() => initNewEditorTab()}
          iconName="Plus"
          size="medium"
          title={`Add new editor tab`}
        />
      </div>
    </div>
  );
};
