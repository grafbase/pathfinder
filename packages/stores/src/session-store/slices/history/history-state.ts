import { HistoryState } from './history.types';

const INITIAL_HISTORY_STORE_STATE: HistoryState = {
  executions: [],
};

export const historyState = {
  ...INITIAL_HISTORY_STORE_STATE,
};
