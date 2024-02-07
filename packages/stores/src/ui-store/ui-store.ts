import { createStore } from 'zustand';

import { UIStore } from './ui-store.types';

export const uiStore = createStore<UIStore>()(() => ({
  isHydrated: false,
  activeSubscriptions: [],
}));
