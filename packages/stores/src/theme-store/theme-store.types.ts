import type { AvailableThemes } from '@pathfinder-ide/shared';
import type { ThemeContractOverrides } from '@pathfinder-ide/style';

export type ThemeOptions = {
  defaultTheme?: AvailableThemes | 'system';
  overrides?: ThemeContractOverrides;
};

type ThemeStoreState = {
  activeTheme: AvailableThemes;
  isInitialized: boolean;
  themeOverrides: ThemeContractOverrides | null;
};

export type ThemeStore = ThemeStoreState;
