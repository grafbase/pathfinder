import type { EditorTabsState } from './slices/editor-tabs';
import type { HistoryState } from './slices/history';
import type { HTTPHeadersState } from './slices/http-headers';
import type { VariablesState } from './slices/variables';

export type SessionStoreBaseState = {
  /**
   * The current target GraphQL endpoint
   */
  endpoint?: string | null;
  /**
   * A boolean indicating whether the connection dialog is open
   */
  connectionDialogOpen: boolean;
};

export type SessionStoreState = SessionStoreBaseState &
  EditorTabsState &
  HistoryState &
  HTTPHeadersState &
  VariablesState;
