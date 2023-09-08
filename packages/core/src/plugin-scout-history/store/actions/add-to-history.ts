import { pluginHistoryStore } from "../plugin-history-store";

import { PluginHistoryStoreActions } from "../plugin-history-store.types";

export const addToHistory: PluginHistoryStoreActions["addToHistory"] = ({
  executionResponse,
}) => {
  pluginHistoryStore.setState({
    executions: [
      ...pluginHistoryStore.getState().executions,
      executionResponse,
    ],
  });
};
