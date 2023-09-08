export type VariablesStoreState = {
  /**
   * A boolean indicating whether Zustand's persist middleware has rehydrated our state
   */
  _hasHydrated: boolean;
  /**
   * The full string value of the variables editor, used during rehydration
   */
  variablesString: string;
};

export type VariablesStore = VariablesStoreState;
