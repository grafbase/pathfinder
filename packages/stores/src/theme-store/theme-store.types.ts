import type { AvailableThemes } from "@graphql-pathfinder/shared";
import { ThemeContractOverrides } from "@graphql-pathfinder/style";

type ThemeStoreState = {
  activeTheme: AvailableThemes | null;
  themeOverrides: ThemeContractOverrides | null;
};

export type ThemeStore = ThemeStoreState;
