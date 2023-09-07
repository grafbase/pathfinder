import { themeStore } from "./theme-store";

import { createZustandSelectors } from "@graphql-pathfinder/shared";

export const useThemeStore = createZustandSelectors(themeStore);
