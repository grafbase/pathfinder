import { pluginHistoryStore } from "../plugin-history-store";
import { PluginHistoryStoreActions } from "../plugin-history-store.types";

export const deleteFromHistory: PluginHistoryStoreActions["deleteFromHistory"] =
  ({ timestamp }) => {
    const executions = pluginHistoryStore.getState().executions;

    const filteredExecutions = executions.filter(
      (execution) => execution.timestamp !== timestamp,
    );

    return pluginHistoryStore.setState({
      executions: filteredExecutions,
    });
  };
