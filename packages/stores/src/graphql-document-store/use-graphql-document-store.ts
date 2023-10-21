import { graphQLDocumentStore } from './graphql-document-store';

import { createZustandSelectors } from '@pathfinder-ide/shared';

export const useGraphQLDocumentStore = createZustandSelectors(graphQLDocumentStore);
