import { PluginHistoryStoreState } from "./plugin-history-store.types";

const INITIAL_PLUGIN_HISTORY_STORE_STATE: PluginHistoryStoreState = {
  executions: [],
};

export const pluginHistoryState = {
  ...INITIAL_PLUGIN_HISTORY_STORE_STATE,
};
