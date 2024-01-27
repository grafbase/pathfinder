import { createStore } from 'zustand/vanilla';

import type { ThemeStore } from './theme-store.types';
import { getUserPreferredTheme } from './utils';

export const themeStore = createStore<ThemeStore>()(() => ({
  activeTheme: getUserPreferredTheme()(),
  isInitialized: false,
  themeOverrides: null,
}));
