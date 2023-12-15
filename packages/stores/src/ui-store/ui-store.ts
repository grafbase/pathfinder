import { createStore } from 'zustand/vanilla';

import { UIStore } from './ui-store.types';

export const uiStore = createStore<UIStore>()(() => ({
  isHydrated: false,
}));
