import { ExecutionResponse } from "@pathfinder/stores";

export type PluginHistoryStoreActions = {
  clearHistory: () => void;
  deleteFromHistory: ({ timestamp }: { timestamp: Date }) => void;
};

export type PluginHistoryStoreState = {
  executions: ExecutionResponse[];
};
