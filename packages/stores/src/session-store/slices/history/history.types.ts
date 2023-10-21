import { ExecutionResponse } from '../../../schema-store';

export type HistoryActions = {
  clearHistory: () => void;
  deleteFromHistory: ({ timestamp }: { timestamp: Date }) => void;
};

export type HistoryState = {
  executions: ExecutionResponse[];
};
