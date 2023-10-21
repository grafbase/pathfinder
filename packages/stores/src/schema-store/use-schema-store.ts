import { schemaStore } from './schema-store';

import { createZustandSelectors } from '@pathfinder-ide/shared';

export const useSchemaStore = createZustandSelectors(schemaStore);
