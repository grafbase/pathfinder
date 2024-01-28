import { createStore } from 'zustand';

import { compassState } from './state';

import type { CompassState } from './compass-store.types';

export const compassStore = createStore<CompassState>(() => ({
  ...compassState,
}));
