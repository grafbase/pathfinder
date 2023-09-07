import { pluginHistoryStore } from "../plugin-history-store";

import { PluginHistoryStoreActions } from "../plugin-history-store.types";

export const clearHistory: PluginHistoryStoreActions["clearHistory"] = () => {
  pluginHistoryStore.setState({
    executions: [],
  });
};
