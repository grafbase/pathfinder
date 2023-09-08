import type { AvailableThemes } from "@pathfinder/shared";
import { ThemeContractOverrides } from "@pathfinder/style";

type ThemeStoreState = {
  activeTheme: AvailableThemes | null;
  themeOverrides: ThemeContractOverrides | null;
};

export type ThemeStore = ThemeStoreState;
