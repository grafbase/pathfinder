import type { AvailableThemes } from '@pathfinder-ide/shared';
import { ThemeContractOverrides } from '@pathfinder-ide/style';

type ThemeStoreState = {
  activeTheme: AvailableThemes | null;
  themeOverrides: ThemeContractOverrides | null;
};

export type ThemeStore = ThemeStoreState;
