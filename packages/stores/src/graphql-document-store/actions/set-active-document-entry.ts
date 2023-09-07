import { graphQLDocumentStore } from "../graphql-document-store";

import type { GraphQLDocumentStoreActions } from "../graphql-document-store.types";

export const setActiveDocumentEntry: GraphQLDocumentStoreActions["setActiveDocumentEntry"] =
  ({ operationEntry }) => {
    graphQLDocumentStore.setState({ activeDocumentEntry: operationEntry });
  };
