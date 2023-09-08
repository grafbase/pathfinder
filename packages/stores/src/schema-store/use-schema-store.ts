import { schemaStore } from "./schema-store";

import { createZustandSelectors } from "@pathfinder/shared";

export const useSchemaStore = createZustandSelectors(schemaStore);
