import { schemaStore } from "./schema-store";

import { createZustandSelectors } from "@graphql-pathfinder/shared";

export const useSchemaStore = createZustandSelectors(schemaStore);
