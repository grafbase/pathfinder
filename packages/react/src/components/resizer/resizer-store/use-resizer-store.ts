import { resizerStore } from './resizer-store';

import { createZustandSelectors } from '@pathfinder-ide/shared';

export const useResizerStore = createZustandSelectors(resizerStore);
