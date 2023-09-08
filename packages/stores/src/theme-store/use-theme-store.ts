import { themeStore } from "./theme-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const useThemeStore = createZustandSelectors(themeStore);
