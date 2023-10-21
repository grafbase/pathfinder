import { INITIAL_GRAPHQL_DOCUMENT_STATE } from '../state';
import { graphQLDocumentStore } from '../graphql-document-store';

export const resetDocumentState = () => {
  graphQLDocumentStore.setState({ ...INITIAL_GRAPHQL_DOCUMENT_STATE });
};
