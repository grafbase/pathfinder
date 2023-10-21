import { themeStore } from './theme-store';

import { createZustandSelectors } from '@pathfinder-ide/shared';

export const useThemeStore = createZustandSelectors(themeStore);
