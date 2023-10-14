import { useEffect, useRef, useState } from "react";

import {
  schemaStore,
  type ExecutionResponse,
  useSessionStore,
  clearHistory,
} from "@pathfinder-ide/stores";
import { shared } from "@pathfinder-ide/style";

import { HistoryListItem } from "./history-list-item";
import { HistoryItemRequest } from "./history-item-request";
import { HistoryItemResponse } from "./history-item-response";

import { Resizer } from "../resizer";
import { Dropdown } from "../dropdown";
import { Tabs } from "../tabs";

import {
  historyClass,
  historyExecutionsClass,
  historyListClass,
  historyListHeaderClass,
  historyNullStateClass,
} from "./history.css";

export const History = () => {
  const executions = useSessionStore.use.executions();

  const [activeHistoryItem, setActiveHistoryItem] =
    useState<ExecutionResponse | null>(executions[0]);

  useEffect(() => {
    if (executions.length === 0) {
      return setActiveHistoryItem(null);
    }

    setActiveHistoryItem(executions[0]);
  }, [executions]);

  const latestResponseRef = useRef(schemaStore.getState().latestResponse);

  useEffect(
    () =>
      schemaStore.subscribe(({ latestResponse }) => {
        if (latestResponse && latestResponse !== latestResponseRef.current) {
          latestResponseRef.current = latestResponse;

          return useSessionStore.setState({
            executions: [
              ...useSessionStore.getState().executions,
              latestResponse,
            ],
          });
        }
      }),
    [],
  );

  return (
    <div className={historyClass}>
      <Resizer
        resizerName={"history_resizer"}
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
              {executions && activeHistoryItem ? (
                <ul className={historyListClass}>
                  {[...executions].map((item, i) => (
                    <HistoryListItem
                      action={() => setActiveHistoryItem(executions[i])}
                      activeItemTimestamp={activeHistoryItem?.timestamp}
                      item={item}
                      key={`${item.timestamp}-${i}`}
                    />
                  ))}
                </ul>
              ) : (
                <span className={historyNullStateClass}>
                  No items in history
                </span>
              )}
            </div>
          ),
        }}
        pane2={{
          component: (
            <Tabs
              styles={{ onSurface: 1 }}
              tabs={[
                {
                  buttonContent: () => <span>Request</span>,
                  name: "PluginHistoryItemRequest",
                  panelContent: () =>
                    activeHistoryItem ? (
                      <HistoryItemRequest historyItem={activeHistoryItem} />
                    ) : (
                      <></>
                    ),
                },
                {
                  buttonContent: () => <span>Response</span>,
                  name: "PluginHistoryItemResponse",
                  panelContent: () =>
                    activeHistoryItem ? (
                      <HistoryItemResponse historyItem={activeHistoryItem} />
                    ) : (
                      <></>
                    ),
                },
              ]}
              tabListHeight={40}
            />
          ),
          initialSize: { type: "PERCENT", value: 40 },
        }}
      />
    </div>
  );
};
