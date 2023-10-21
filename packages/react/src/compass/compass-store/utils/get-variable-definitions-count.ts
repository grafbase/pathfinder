import { Kind } from 'graphql';

import { graphQLDocumentStore } from '@pathfinder-ide/stores';

export const getVariableDefinitionsCount = (): number => {
  const activeDocumentEntry = graphQLDocumentStore.getState().activeDocumentEntry;

  if (
    activeDocumentEntry?.node.kind === Kind.OPERATION_DEFINITION &&
    activeDocumentEntry.node.variableDefinitions
  ) {
    return activeDocumentEntry.node.variableDefinitions.length;
  }
  return 0;
};
