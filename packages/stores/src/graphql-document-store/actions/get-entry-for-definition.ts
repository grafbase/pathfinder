import { graphQLDocumentStore } from "../graphql-document-store";

import type { GraphQLDocumentStoreActions } from "../graphql-document-store.types";

export const getEntryForDefinition: GraphQLDocumentStoreActions["getEntryForDefinition"] =
  ({ definition }) => {
    const documentEntries = graphQLDocumentStore.getState().documentEntries;

    return documentEntries.find(
      (d) => d.node.loc?.start === definition.loc?.start,
    );
  };
