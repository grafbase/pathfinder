import type { EditorTabsState } from "./slices/editor-tabs";
import type { HTTPHeadersState } from "./slices/http-headers";
import type { VariablesState } from "./slices/variables";

export type SessionStoreBaseState = {
  /**
   * A boolean indicating whether Zustand's persist middleware has rehydrated our state
   */
  _hasHydrated: boolean;
  /**
   * The current target GraphQL endpoint
   */
  endpoint?: string | null;
};

export type SessionStoreState = SessionStoreBaseState &
  EditorTabsState &
  HTTPHeadersState &
  VariablesState;
