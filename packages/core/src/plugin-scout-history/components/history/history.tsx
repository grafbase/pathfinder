import { useEffect, useState } from "react";

import type { ExecutionResponse } from "@pathfinder/stores";

import { clearHistory } from "../../store";

import { Dropdown, Resizer, Tabs } from "../../../components";

import { HistoryListItem } from "../history-list-item";
import { Pre } from "../pre";

import {
  historyClass,
  historyExecutionsClass,
  historyListClass,
  historyListHeaderClass,
  historyNullStateClass,
} from "./history.css";
import { HistoryItemRequest } from "../history-item-request";
import { shared } from "@pathfinder/style";

export const History = ({
  historyItems,
}: {
  historyItems: ExecutionResponse[];
}) => {
  const [activeHistoryItem, setActiveHistoryItem] =
    useState<ExecutionResponse | null>(historyItems[0]);

  useEffect(() => {
    if (historyItems.length === 0) {
      return setActiveHistoryItem(null);
    }

    setActiveHistoryItem(historyItems[0]);
  }, [historyItems]);

  if (historyItems.length === 0 || !activeHistoryItem) {
    return (
      <div className={historyNullStateClass}>
        <span>No items in history. Need to work on this null state.</span>
      </div>
    );
  }

  return (
    <div className={historyClass}>
      <Resizer
        onSurface={1}
        orientation="HORIZONTAL"
        pane1={{
          component: (
            <div className={historyExecutionsClass}>
              <div
                className={`${historyListHeaderClass} ${shared.hairlineBorder({
                  border: "bottom",
                  onSurface: 1,
                })}`}
              >
                Execution History
                <Dropdown
                  buttons={[
                    {
                      action: () => clearHistory(),
                      copy: "Clear all items from history",
                      iconName: "Delete",
                      onSurface: 3,
                      size: "medium",
                      title: "Clear all items from history",
                      width: "100%",
                      withBorder: false,
                    },
                  ]}
                  iconButtonProps={{
                    iconName: "Gear",
                    onSurface: 2,
                    size: "small",
                    title: "Execution history settings",
                  }}
                />
              </div>
              <ul className={historyListClass}>
                {[...historyItems].map((item, i) => (
                  <HistoryListItem
                    action={() => setActiveHistoryItem(historyItems[i])}
                    activeItemTimestamp={activeHistoryItem?.timestamp}
                    item={item}
                    key={`${item.timestamp}-${i}`}
                  />
                ))}
              </ul>
            </div>
          ),
        }}
        pane2={{
          component: (
            <Tabs
              styles={{ buttonStyle: "INLINE", onSurface: 1 }}
              tabs={[
                {
                  buttonContent: () => <span>Request</span>,
                  name: "PluginHistoryItemRequest",
                  panelContent: () => (
                    <HistoryItemRequest historyItem={activeHistoryItem} />
                  ),
                },
                {
                  buttonContent: () => <span>Response</span>,
                  name: "PluginHistoryItemResponse",
                  panelContent: () => (
                    <Pre
                      code={JSON.stringify(
                        activeHistoryItem?.response.data,
                        null,
                        2,
                      )}
                    />
                  ),
                },
              ]}
              tabListHeight={32}
            />
          ),
          initialSize: { type: "PERCENT", value: 40 },
        }}
      />
    </div>
  );
};
