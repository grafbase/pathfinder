import { VARIABLES_EDITOR_DEFAULT_VALUE } from '@pathfinder-ide/shared';

import type { VariablesState } from './variables.types';

export const INITIAL_VARIABLES_STATE: VariablesState = {
  variablesString: VARIABLES_EDITOR_DEFAULT_VALUE,
};

export const variablesState = {
  ...INITIAL_VARIABLES_STATE,
};
