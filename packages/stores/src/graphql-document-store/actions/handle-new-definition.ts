import type {
  GraphQLDocumentStoreActions,
  OperationEntry,
} from "../graphql-document-store.types";

export const handleNewDefinition: GraphQLDocumentStoreActions["handleNewDefinition"] =
  ({ definition }) => {
    const newEntry: OperationEntry = {
      latestResponse: null,
      node: definition,
    };
    return newEntry;
  };
