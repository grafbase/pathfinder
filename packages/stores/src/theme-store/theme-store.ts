import { createStore } from 'zustand/vanilla';

import type { ThemeStore } from './theme-store.types';

export const themeStore = createStore<ThemeStore>()(() => ({
  activeTheme: null,
  themeOverrides: null,
}));
