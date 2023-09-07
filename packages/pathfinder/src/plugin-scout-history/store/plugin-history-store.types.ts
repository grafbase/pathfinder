import { ExecutionResponse } from "@graphql-pathfinder/stores";

export type PluginHistoryStoreActions = {
  addToHistory: ({
    executionResponse,
  }: {
    executionResponse: ExecutionResponse;
  }) => void;
  clearHistory: () => void;
  deleteFromHistory: ({ timestamp }: { timestamp: Date }) => void;
};

export type PluginHistoryStoreState = {
  executions: ExecutionResponse[];
};
