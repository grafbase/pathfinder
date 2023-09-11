import { useRef, useEffect } from "react";

import { schemaStore } from "@pathfinder/stores";

import { usePluginHistoryStore } from "../store";

import { History } from "./history";

export const PluginScoutHistory = () => {
  const executions = usePluginHistoryStore.use.executions();

  const latestResponseRef = useRef(schemaStore.getState().latestResponse);

  useEffect(
    () =>
      schemaStore.subscribe(({ latestResponse }) => {
        if (latestResponse && latestResponse !== latestResponseRef.current) {
          latestResponseRef.current = latestResponse;

          return usePluginHistoryStore.setState({
            executions: [
              ...usePluginHistoryStore.getState().executions,
              latestResponse,
            ],
          });
        }
      }),
    [],
  );

  return <History historyItems={executions} />;
};
