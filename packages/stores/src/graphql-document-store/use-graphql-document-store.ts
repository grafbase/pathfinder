import { graphQLDocumentStore } from "./graphql-document-store";

import { createZustandSelectors } from "@graphql-pathfinder/shared";

export const useGraphQLDocumentStore =
  createZustandSelectors(graphQLDocumentStore);
